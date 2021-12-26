import Vue from "vue";
import App from "./App.vue";
// TODO: don't forget to add pagination
// TODO: fix select without reduce
// TODO: fix on change select from out of component
require("./assets/global.scss");
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
