import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// import components
import LoginPage from './components/LoginPage.vue'
import CasesView from './components/CasesView.vue'
import CasePage from './components/CasePage.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: LoginPage },
  { path: '/cases', component: CasesView },
  { path: '/case/:caseId', component: CasePage },
  
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  router: router,
  render: function (h) { return h(App) },
}).$mount('#app')
