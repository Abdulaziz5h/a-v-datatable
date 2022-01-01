import Vue from "vue";
import App from "./App.vue";
// TODO: fix ... on pagination 5
// TODO: reset header checkbox on collapse close
// TODO: fix on change select from out of component
// TODO: add column alignment attrebute at the header obj
// TODO: add obtion to control on delete remove items from value list
require("./assets/global.scss");
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
