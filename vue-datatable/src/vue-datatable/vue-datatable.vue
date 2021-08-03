<template>
    <div class="vc__table-container" :class="classes">
        <table class="vc__table" border="0" cellspacing="0" cellpadding="0">
            <thead class="vc__table__thead">
                <slot name="header">
                    <vue-datatable-header-row
                        :row="headers"
                        :label="headerOptions.label"
                        :value="headerOptions.value"
                        :selectOptions="selectOptions"
                        @changeHeaderCheckbox="changeHeaderCheckbox"
                        :isCollapse="collapseOptoins.enable"
                    >
                        <template slot="header-th" slot-scope="{ th }">
                            <slot name="header-th" :th="th"></slot>
                        </template>
                        <template
                            v-for="th in headers"
                            :slot="'header-th.' + th[headerOptions.value]"
                        >
                            <slot
                                :name="'header-th.' + th[headerOptions.value]"
                                :th="th"
                                :label="th[headerOptions.label]"
                            ></slot>
                        </template>
                    </vue-datatable-header-row>
                </slot>
            </thead>
            <transition name="slide">
                <caption v-if="!rows.length">
                    لا يوجد بيانات
                </caption>
                <tbody v-else class="vc__table__tbody">
                    <slot name="body">
                        <template v-for="(row, index) in rows">
                            <vue-datatable-body-row
                                :headerOptions="headerOptions"
                                :row="row"
                                :rowIndex="index"
                                :selectOptions="selectOptions"
                                :key="index"
                                @changeCheckbox="changeCheckbox(row.row, index)"
                                :isCollapse="collapseOptoins.enable"
                            >
                                <!-- selection input cells -->
                                <template slot="header-select-input">
                                    <slot name="header-select-input"></slot>
                                </template>
                                <template slot="body-select-input">
                                    <slot
                                        name="body-select-input"
                                        :row="row"
                                    ></slot>
                                </template>
                                <!-- / selection input cells -->
                                <!-- default rows rows -->
                                <template
                                    slot="row-td"
                                    slot-scope="{ value, argkey }"
                                >
                                    <slot
                                        name="row-td"
                                        :row="row"
                                        :value="value"
                                        :argkey="argkey"
                                    ></slot>
                                </template>
                                <template
                                    v-for="(td, key) in row.formatedRow"
                                    :slot="'row-td.' + key"
                                    slot-scope="{ value }"
                                >
                                    <slot
                                        :name="'row-td.' + key"
                                        :value="value"
                                        :row="row"
                                    ></slot>
                                </template>
                                <!-- / default rows rows -->
                            </vue-datatable-body-row>
                            <!-- TODO: fix animation -->
                            <transition name="slide"
                                :key="'collapse-tr-' + index"
                            >
                                <tr
                                    v-if="
                                        collapseOptoins.enable &&
                                        row.row[collapseOptoins.label] &&
                                        row.open
                                    "
                                    class="collapse-tr"
                                >
                                    <td colspan="100%">
                                        <vue-datatable
                                            :headers="subHeaders"
                                            :headerOptions="headerOptions"
                                            :items="row.row[collapseOptoins.label]"
                                            :selectOptions="selectOptions"
                                            :classes="classes"
                                        ></vue-datatable>
                                    </td>
                                </tr>
                            </transition>
                        </template>
                    </slot>
                </tbody>
            </transition>
            <slot name="footer"> </slot>
        </table>
    </div>
</template>
<script>
import vueDatatableHeaderRow from "./vue-datatable-components/vue-datatable-header-row";
import vueDatatableBodyRow from "./vue-datatable-components/vue-datatable-body-row.vue";

import { getPropsObj } from "@/utils";

const headerOptionsDefault = { label: "label", value: "value" };
const selectOptionsDefault = { enable: false, label: "selected" };
const collapseOptoinsDefault = { enable: false, label: "children" };
import { ref } from "@vue/composition-api";
import _ from "lodash";

// TODO: remove this
import { subHeaders } from "@/fake-data/table-rows.js";
export default {
    name: "vue-datatable",
    components: {
        vueDatatableHeaderRow,
        vueDatatableBodyRow
    },
    data: () => ({
        selected: new Map(),
        subHeaders
    }),
    props: {
        // table header row
        headers: {
            type: Array,
            required: true,
            default: () => []
        },
        headerOptions: {
            type: Object,
            default: () => headerOptionsDefault
        },

        // table body rows
        items: {
            type: Array,
            required: true
        },

        // Select Options
        selectOptions: {
            type: Object,
            default: () => selectOptionsDefault
        },
        value: {
            type: null
        },
        reduce: {
            type: Function,
            default: () => null
        },

        // Collapse Optoins
        collapseOptoins: {
            type: Object,
            default: () => collapseOptoinsDefault
        },

        // styling props
        classes: {
            type: String
        }
    },
    setup(props) {
        // set default header value
        getPropsObj(props.headerOptions, headerOptionsDefault);
        getPropsObj(props.selectOptions, selectOptionsDefault);
        getPropsObj(props.collapseOptoins, collapseOptoinsDefault);

        const rows = props.items.map((row, index) => {
            const formatedRow = {};
            props.headers.forEach(head => {
                Object.assign(formatedRow, {
                    [head[props.headerOptions.value]]:
                        row[head[props.headerOptions.value]]
                });
            });
            const obj = ref({
                id: index,
                row: { ...row },
                formatedRow,
                [props.selectOptions.label]: false,
                open: false
            });
            return obj.value;
        });
        return { rows };
    },
    mounted() {
        if (this.value) {
            this.value.forEach(val => {
                let idx = this.rows.findIndex(row => {
                    if (this.reduce(row.row) != null) {
                        return _.isEqual(this.reduce(row.row), val);
                    } else {
                        return _.isEqual(row.row, val);
                    }
                });
                if (idx != -1) this.rows[idx][this.selectOptions.label] = true;
            });
        }
    },
    methods: {
        changeHeaderCheckbox(val) {
            this.rows.map(row => {
                row[this.selectOptions.label] = val;
            });
        },
        changeCheckbox(row, index) {
            if (this.selected.get(index)) {
                this.selected.delete(index);
            } else {
                if (this.reduce(row) != null) {
                    this.selected.set(index, this.reduce(row));
                } else {
                    this.selected.set(index, row);
                }
            }
            this.$emit("input", this.selected);
        }
    }
};
</script>
