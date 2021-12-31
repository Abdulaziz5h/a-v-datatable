import Vue from "vue";
import App from "./App.vue";
// TODO: don't forget to add pagination
// TODO: fix on change select from out of component
// TODO: create methods to fire on change checkbox slot for header and body
// TODO: add column alignment attrebute at the header obj
// TODO: add obtion to control on delete remove items from value list
require("./assets/global.scss");
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
