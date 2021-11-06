<template>
    <div class="vc__table-container" :class="classes">
        <table class="vc__table" border="0" cellspacing="0" cellpadding="0">
            <thead class="vc__table__thead">
                <slot name="header">
                    <vue-datatable-header-row
                        :row="headers"
                        :label="headerOptions.label"
                        :value="headerOptions.value"
                        :collapseOptoins="collapseOptoins"
                        :selectOptions="selectOptions"
                        @changeHeaderCheckbox="
                            changeHeaderCheckbox(rows, $event)
                        "
                        :isCollapse="collapseOptoins.enable"
                        :headerStatus="
                            !headerStatus
                                ? -1
                                : headerStatus == rows.length
                                ? 1
                                : 0
                        "
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
                <caption v-if="!rows || !rows.length">
                    <slot name="empty">
                        No items was found
                    </slot>
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
                                @changeCheckbox="changeCheckbox(row)"
                                :collapseOptoins="collapseOptoins"
                                :isCollapse="collapseOptoins.enable"
                                :headerStatus="
                                    !headerStatus
                                        ? -1
                                        : headerStatus == rows.length
                                        ? 1
                                        : 0
                                "
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
                            <td
                                colspan="100%"
                                v-if="row.row[collapseOptoins.label]"
                                :key="'collapse-tr-' + index"
                            >
                                <transition name="slide">
                                    <div
                                        class="collapse-tr"
                                        v-if="
                                            collapseOptoins.enable &&
                                                row.row[
                                                    collapseOptoins.label
                                                ] &&
                                                row.open
                                        "
                                    >
                                        <vue-datatable
                                            :headers="collapseOptoins.headers"
                                            :headerOptions="headerOptions"
                                            :items="
                                                row.row[collapseOptoins.label]
                                            "
                                            :selectOptions="selectOptions"
                                            :classes="classes"
                                            isChild
                                            :reduce="reduce"
                                            v-model="value"
                                        ></vue-datatable>
                                    </div>
                                </transition>
                            </td>
                        </template>
                    </slot>
                </tbody>
            </transition>
            <slot name="footer"></slot>
        </table>
    </div>
</template>
<script>
import vueDatatableHeaderRow from "./vue-datatable-components/vue-datatable-header-row";
import vueDatatableBodyRow from "./vue-datatable-components/vue-datatable-body-row.vue";

// getPropsObj this func combine props
import { getPropsObj } from "@/utils";

// default props
const headerOptionsDefault = { label: "label", value: "value" };
const selectOptionsDefault = {
    enable: false,
    label: "selected"
};
const collapseOptoinsDefault = {
    enable: false,
    label: "children",
    headers: []
};
import { ref } from "@vue/composition-api";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export default {
    name: "vue-datatable",
    components: {
        vueDatatableHeaderRow,
        vueDatatableBodyRow
    },
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
            type: Array
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
        },
        isChild: Boolean
    },
    setup(props) {
        let headerStatus = 0;
        // set default headers value if no collapse option headers was implement
        collapseOptoinsDefault.headers = props.headers;

        // combine default props with enterd props
        getPropsObj(props.headerOptions, headerOptionsDefault);
        getPropsObj(props.selectOptions, selectOptionsDefault);
        getPropsObj(props.collapseOptoins, collapseOptoinsDefault);

        const rows = props.items.map(row => {
            const formatedRow = {};
            props.headers.forEach(head => {
                Object.assign(formatedRow, {
                    [head[props.headerOptions.value]]:
                        row[head[props.headerOptions.value]]
                });
            });
            const obj = ref({
                id: uuidv4(),
                row: { ...row },
                formatedRow,
                [props.selectOptions.label]:
                    props.value.findIndex(val => {
                        if (props.reduce(row) != null) {
                            return _.isEqual(props.reduce(row), val);
                        } else {
                            return _.isEqual(row, val);
                        }
                    }) != -1,
                open: false
            });
            if (obj.value[props.selectOptions.label]) {
                headerStatus++;
            }
            return obj.value;
        });
        return { rows, headerStatus };
    },
    methods: {
        changeHeaderCheckbox(rows, val) {
            rows.forEach(row => {
                row[this.selectOptions.label] = val;
                this.changeCheckbox(row, val);
            });
        },
        changeCheckbox(row, is) {
            const index = this.value.findIndex(val => {
                if (this.reduce(row.row) != null) {
                    return _.isEqual(this.reduce(row.row), val);
                } else {
                    return _.isEqual(row.row, val);
                }
            });
            if (is === undefined) {
                if (index != -1) {
                    this.value.splice(index, 1);
                    this.headerStatus--;
                } else {
                    if (this.reduce(row.row) != null) {
                        this.value.unshift(this.reduce(row.row));
                    } else {
                        this.value.unshift(row.row);
                    }
                    this.headerStatus++;
                }
            } else if (is) {
                if (index == -1) {
                    if (this.reduce(row.row) != null) {
                        this.value.unshift(this.reduce(row.row));
                    } else {
                        this.value.unshift(row.row);
                    }
                    this.headerStatus++;
                }
            } else {
                if (index != -1) {
                    this.value.splice(index, 1);
                    this.headerStatus--;
                }
            }
            this.$emit("input", this.value);
        }
    }
};
</script>
