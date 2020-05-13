import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'

// import components
import LoginPage from './components/LoginPage.vue'
import CasesView from './components/CasesView.vue'
import CasePage from './components/CasePage.vue'
import AddCase from './components/AddCase.vue'
import AddSuspect from './components/AddSuspect.vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: LoginPage },
  { path: '/cases', component: CasesView },
  { path: '/addCase', component: AddCase, props: true },
  { path: '/case/:caseId', component: CasePage, props: true },
  { path: '/case/:caseId/addSuspect', component: AddSuspect, props: true },
  
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes: routes
})

const store = new Vuex.Store({
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

new Vue({
  router: router,
  store: store,
  render: function (h) { return h(App) },
}).$mount('#app')
