import vueDatatable from "./vue-datatable/vue-datatable.vue";

const vueDatatablePlugin = {
    install(Vue) {
        Vue.component("vue-datatable", vueDatatable);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(vueDatatablePlugin);
}

export default vueDatatablePlugin;
