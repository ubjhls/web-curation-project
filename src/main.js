import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './routes'
import store from './vuex/store'
import axios from 'axios'
import vuetify from './plugins/vuetify';

Vue.prototype.$Axios = axios;
Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
    routes,
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');


