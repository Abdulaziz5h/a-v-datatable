<template>
    <div id="app">
        <div>
            <vue-datatable
                :headers="headers"
                :headerOptions="headerOptions"

                :items="items"

                :selectOptions="selectOptions"
                @input="selectRow"
            >
                <!-- :reduce="(item) => item.id" -->
                <!-- :reduce="(item) => ({id: item.id, firstName: item.firstName})" -->
            </vue-datatable>
            <footer class="footer">
                Developing...
            </footer>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer{
    bottom: 0;
    left: 0;
    right: 0;
    background: #304455;
    color: #fff;
    padding: 8px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 2px;
}
</style>
<script>
import vueDatatable from "./vue-datatable/vue-datatable";
import { rows, headers } from "@/fake-data/table-rows.js"
export default {
    name: "App",
    components: {
        vueDatatable
    },
    data() {
        return {
            headers,
            headerOptions: {
                label: 'label',
                value: 'value'
            },
            items: rows,
            selectOptions: {
                enable: true,
            },
            selected: [],
        };
    },
    methods: {
        selectRow(selected) {
            console.log(selected)
        }
    }
};
</script>
