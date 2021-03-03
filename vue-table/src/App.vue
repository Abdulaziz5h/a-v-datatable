<template>
    <div id="app">
        <vue-colabse-table
            label="label"
            align="center"
            :headers="header"
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
            header: {
                rowItem: [
                    {
                        label: "الاسم الاول",
                        value: "firstName"
                    },
                    {
                        label: "الاسم الاخير",
                        value: "LastName"
                    }
                ],
                label: 'label',
                value: 'value'
            } 
            ,
            items: [
                {
                    id: 0,
                    firstName: "ahmed",
                    LastName: "hashash"
                },
                {
                    id: 1,
                    firstName: "abood",
                    LastName: "shoho",
                },
                {
                    id: 2,
                    firstName: "sozan",
                    LastName: "mejo",
                }
            ]
        };
    }
};
</script>

<style lang="scss"></style>
