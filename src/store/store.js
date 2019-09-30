import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
 
let store = new Vuex.Store({
    state: {
        paymentSucc: "",
        paymentErr:""
    },
    mutations: {
        setpaymentSucc(state, paymentSuccess) {
            console.log(paymentSuccess)
            state.paymentSucc = paymentSuccess

        },
        paymentErr(state, paymentError) {
            state.paymentErr = paymentError

        }
    },
    actions: {},

    getters: {},
    modules: {}

})
export default store
