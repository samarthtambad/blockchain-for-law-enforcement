import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        auth: {
            user: "",
            secret: "",
            token: ""
        }
    },
    getters: {
        userAuth(state) {
            return state.auth
        }
    }
})