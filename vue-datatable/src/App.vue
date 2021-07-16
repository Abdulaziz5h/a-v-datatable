<template>
    <div id="app">
        <vue-datatable
            label="id"

            :header="header"


            :items="items"

            :selectOptions="selectOptions"
            @changeCheckbox="selectRow"

            :collapseOptions="collapseOptions"
        >
            <!-- :reduce="(item) => ({id: item.id, firstName: item.firstName})" -->
            <!-- :reduce="(item) => id: item.id" -->
        </vue-datatable>
        <footer class="footer">
            Developing...
        </footer>
    </div>
</template>
<style lang="scss" scoped>
.footer{
    position: fixed;
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
export default {
    name: "App",
    components: {
        vueDatatable
    },
    data() {
        return {
            header: {
                headers: [
                    {
                        label: "الاسم الاول",
                        value: "firstName"
                    },
                    {
                        label: "الاسم الاخير",
                        value: "LastName"
                    },
                    {
                        label: "كلمة المرور",
                        value: "password"
                    }
                ],
                label: 'label',
                value: 'value'
            },
            items: [
                {
                    id: 0,
                    firstName: "ahmed",
                    LastName: "hashash",
                    password: "******",
                },
                {
                    id: 1,
                    firstName: "abood",
                    LastName: "shoho",
                    password: "********",
                },
                {
                    id: 2,
                    firstName: "sozan",
                    LastName: "mejo",
                    password: "*******",
                }
            ],
            selectOptions: {
                enable: true,
                label: 'selected'
            },
            selected: [],

            
            collapseOptions: {
                enable: true,
                childrenLabel: 'children',
                enableCustomHeadre: true,
                customHeaderLabel: 'label',
                header:  [
                    {
                        label: 'اسم الوحدة',
                        value: 'subjectName'
                    },
                    {
                        label: 'الحسم',
                        value: 'discount'
                    },
                    {
                        label: 'السعر',
                        value: 'price'
                    }
                ]
            },
        };
    },
    methods: {
        selectRow(selected) {
            console.log(selected)
        }
    }
};
</script>

<style lang="scss"></style>
