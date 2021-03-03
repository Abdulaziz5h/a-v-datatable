<template>
    <div id="app">
        <vue-colabse-table
            label="label"
            align="center"
            :header="header"
            :collapseOptions="collapseOptions"
            :value="selected"
            :selectOptions="selectOptions"
            :items="items"
            borderd
        >
        </vue-colabse-table>
    </div>
</template>

<script>
import vueColabseTable from "./vue-colabse-table/vue-colabse-table";
export default {
    name: "App",
    components: {
        vueColabseTable
    },
    data() {
        return {
           
            header: {
                rowItem: [
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
                    password: "******"
                },
                {
                    id: 1,
                    firstName: "abood",
                    LastName: "shoho",
                    password: "********"
                },
                {
                    id: 2,
                    firstName: "sozan",
                    LastName: "mejo",
                    password: "*******"
                }
            ],


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
            selectOptions: {
                enable: true,
                label: 'selected'
            },
            selected: [],
        };
    }
};
</script>

<style lang="scss"></style>
