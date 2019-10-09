import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        paymentSucc: "",
        paymentErr: "",
        resultCode: ""
    },
    mutations: {
        setpaymentSucc(state, paymentSuccess) {
            console.log(paymentSuccess)
            state.paymentSucc = paymentSuccess
        },
        paymentErr(state, paymentError) {
            console.log(paymentError)
            state.paymentErr = paymentError
        },
        codeResult(state, resultCode) {
            state.resultCode = resultCode
            console.log(state.resultCode)
        }
    },
    actions: {//异步
        setpaymentSucc({ commit }) {
            commit('setpaymentSucc', paymentSuccess)
        }
    },

    getters: {},
    modules: {}

})
export default store
