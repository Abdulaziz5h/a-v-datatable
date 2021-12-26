import Vue from "vue";
import App from "./App.vue";
// TODO: don't forget to add pagination
require("./assets/global.scss");
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
