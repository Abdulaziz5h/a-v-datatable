import component from "./a-v-datatable/a-v-datatable.vue";

const aVDatatablePlugin = {
    install(Vue) {
        Vue.component("a-v-datatable", component);
    }
};

export default aVDatatablePlugin;
export const aVDatatable = component;
