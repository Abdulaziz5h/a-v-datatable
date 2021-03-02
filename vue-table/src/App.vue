<template>
    <div id="app">
        <vue-colabse-table
            label="label"
            align="center"
            :headers="header"
            :colapseOptions="{
                enable: true,
                childrenLabel: 'children',
                enableCustomHeadre: true,
                customHeaderLabel: 'label',
                header: [
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
            }"
            :value="selected"
            :selectOptions="{
                enable: true,
                label: 'selected'
            }"
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
            selected: [],
            header: [
                {
                    label: "اسم المادة",
                    value: "subjectName"
                },
                {
                    label: "السعر",
                    value: "price",
                    type: "number"
                }
            ],
            items: [
                {
                    id: 0,
                    subjectName: "Senior Devs",
                    price: 0.15296
                },
                {
                    id: 0,
                    subjectName: "Senior Devs",
                    price: 0.15296,
                    children: [
                        {
                            id: 1,
                            subjectName: "John",
                            discount: 20,
                            price: 0.03845
                        },
                        {
                            id: 3,
                            subjectName: "Susan",
                            discount: 16,
                            price: 0.08503
                        }
                    ]
                },
                {
                    id: 0,
                    subjectName: "Senior Devs",
                    price: 0.15296,
                    children: [
                        {
                            id: 1,
                            subjectName: "John",
                            discount: 20,
                            price: 0.03845
                        },
                        {
                            id: 2,
                            subjectName: "Jane",
                            discount: 24,
                            price: 0.02948
                        },
                        {
                            id: 3,
                            subjectName: "Susan",
                            discount: 16,
                            price: 0.08503
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss"></style>
