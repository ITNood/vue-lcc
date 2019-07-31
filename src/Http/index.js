import axios from 'axios'
import { Loading, Message } from 'element-ui'
import json_response_codes from './codes'
import config from '../config'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 创建axios实例
//let token = window.localStorage.getItem("token") 
const Axios = axios.create({
    baseURL: "http://www.hxfc.com/",//fc.home.fc9m.com  www.hxfc.com
    timeout: 5000,//超时请求
    maxRedirects: 1,
    headers: { "Content-Type": 'application/json' },
})
//拦截所有api请求，重新获取token
Axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem('token')
        const lang = window.localStorage.getItem('lang')
        if (token&&lang) {
            config.headers.Token = token
            config.headers.lang = lang
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


var loadinginstace;

// override axios's default accept
//Axios.defaults.headers.common['Accept'] = 'application/json'

// 拦截所有的 api 请求，未来可做权限检查，缓存，代理等
Axios.interceptors.request.use(
    config => {
        // element ui Loading方法
        loadinginstace = Loading.service({ fullscreen: true, text: 'Loading...' })
        return config;
    },
    error => {
        loadinginstace.close()
        return Promise.reject(error);
    },

);

// 拦截所有的 api 响应，可以实现自动弹窗报错
Axios.interceptors.response.use(
    net_response => {   // when HTTP_STATUS in [ 200 , 299 ]
        // const json_response = net_response.data;
        loadinginstace.close()
        //判断登录状态，跳转路由
        if (net_response.data.status === 500) {
            alert(net_response.data.msg)
            console.log(window.location.host+"/login")
            window.localStorage.removeItem('token')
           //window.location.href="/login"
            window.location.href = window.location.origin + "#/login"
        //    this.$router.push('/login')
        } else if (net_response.data.status === 400) {
           // alert(net_response.data.msg)
        }

        //返回数据
        if (net_response.status === json_response_codes.status) {
            return Promise.resolve(net_response.data);
        }

        Message({
            //请求超时时间
            message: json_response.message || this.$t('message.interface'), type: 'error', duration: 30 * 1000
        });

        return Promise.reject(net_response);
    },
    error => {      // when HTTP_STATUS in [ 300 , 599 ]

        loadinginstace.close()

        if (error === 'cancelled locally') {
            return Promise.reject(error);
        }

        if (error.message === 'timeout of 5000ms exceeded') {
            Message({
                message: '接口请求超时!', type: 'error', duration: 3 * 1000
            });
            return Promise.reject(error);
        }

        if (error.response.status === 429) {
            Message({
                message: '您的请求频率太快啦!', type: 'info', duration: 3 * 1000
            });
            return Promise.reject(error);
        }

        Message({
            message: '接口或网络异常，请稍后再试!', type: 'error', duration: 3 * 1000
        });

        return Promise.reject(error);
    }
);

export default Axios;


