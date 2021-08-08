<template>
<!-- TODO: Select values from sub table -->
    <div id="app">
        <div style="padding-bottom: 40px;">
            <vue-datatable
                :headers="headers"
                :headerOptions="headerOptions"
                :items="items"
                :selectOptions="selectOptions"

                :collapseOptoins="collapseOptoins"

                v-model="selected"
                classes="borderd cell-borderd striped"
            >
                <!-- select1 => :reduce="(item) => item.id" -->
                <!-- select2 => :reduce="(item) => ({id: item.id, first_name: item.first_name})" -->
            </vue-datatable>
            <footer class="footer">
                Developing...
            </footer>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer {
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
import { rows, headers } from "@/fake-data/table-rows.js";
export default {
    name: "App",
    components: {
        vueDatatable
    },
    data() {
        return {
            headers,
            headerOptions: {
                label: "label",
                value: "value"
            },
            items: rows,
            selectOptions: {
                enable: true
            },
            collapseOptoins: {
                enable: true,
                label: 'cars',
                // TODO: add select group options
                groupSelect: true
            },
            selected: [
                {
                    id: 8,
                    first_name: "Marjy",
                    last_name: "Arden",
                    email: "marden7@imdb.com",
                    gender: "Male",
                    cars: [
                        {
                            id: 5,
                            make: "Ford",
                            model: "LTD Crown Victoria",
                            modelYear: 1991
                        }
                    ]
                },
                {
                    id: 4,
                    first_name: "Jason",
                    last_name: "Wilprecht",
                    email: "jwilprecht3@booking.com",
                    gender: "Female",
                    cars: [
                        {
                            id: 1,
                            make: "GMC",
                            model: "Yukon Denali",
                            modelYear: 2006
                        },
                        {
                            id: 2,
                            make: "Mitsubishi",
                            model: "Diamante",
                            modelYear: 1995
                        }
                    ]
                }
            ],
            // selected1: [4, 6, 1],
            // selected2: [
            //     { id: 8, first_name: "Marjy" },
            //     { id: 6, first_name: "Abbey" },
            //     { id: 4, first_name: "Jason" }
            // ],
        };
    }
};
</script>
