<template>
    <div class="vc__table-container" :class="classes">
        <table class="vc__table" border="0" cellspacing="0" cellpadding="0">
            <thead class="vc__table__thead">
                <slot name="header">
                    <a-v-datatable-header-row
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
                    </a-v-datatable-header-row>
                </slot>
            </thead>
            <transition name="slide">
                <tbody v-if="rows && rows.length" class="vc__table__tbody">
                    <slot name="body">
                        <template v-for="(row, index) in rows">
                            <a-v-datatable-body-row
                                :headerOptions="headerOptions"
                                :row="row"
                                :rowIndex="index"
                                :selectOptions="selectOptions"
                                :key="row.id"
                                :collapseOptoins="collapseOptoins"
                                :isCollapse="collapseOptoins.enable"
                                :headerStatus="
                                    !headerStatus
                                        ? -1
                                        : headerStatus == rows.length
                                        ? 1
                                        : 0
                                "
                                @changeCheckbox="changeCheckbox(row)"
                                @remove="remove(row.row[uniqueId])"
                                @details="details"
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
                                <template
                                    slot="row-td.actions"
                                    slot-scope="{ tr }"
                                >
                                    <!-- tr = row -->
                                    <slot name="row-td.actions" :row="tr">
                                        <template slot="remove">
                                            <slot
                                                name="remove"
                                                :row="tr"
                                            ></slot>
                                        </template>
                                        <template slot="details">
                                            <slot
                                                name="details"
                                                :row="tr"
                                            ></slot>
                                        </template>
                                    </slot>
                                </template>
                                <template slot="collapse-icon">
                                    <slot name="collapse-icon"></slot>
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
                            </a-v-datatable-body-row>
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
                                        <a-v-datatable
                                            :headers="collapseOptoins.headers"
                                            :headerOptions="headerOptions"
                                            :items="
                                                row.row[collapseOptoins.label]
                                            "
                                            :key="row.id"
                                            :selectOptions="selectOptions"
                                            :classes="classes"
                                            :ref="
                                                'sub-table_row' +
                                                    row.row[uniqueId]
                                            "
                                            :uniqueId="collapseOptoins.uniqueId"
                                            :reduce="reduce"
                                            v-model="value[row.row[uniqueId]]"
                                            @details="details"
                                        >
                                        </a-v-datatable>
                                    </div>
                                </transition>
                            </td>
                        </template>
                    </slot>
                </tbody>
                <caption v-else>
                    <slot name="empty">
                        No items was found
                    </slot>
                </caption>
            </transition>
            <slot name="footer"></slot>
        </table>
    </div>
</template>
<script>
import aVDatatableHeaderRow from "./a-v-datatable-components/a-v-datatable-header-row";
import aVDatatableBodyRow from "./a-v-datatable-components/a-v-datatable-body-row.vue";

// getPropsObj this func combine props
import { getPropsObj, createRow, warnIndexNotFound } from "@/utils";

// default props
const headerOptionsDefault = { label: "label", value: "value" };
const selectOptionsDefault = {
    enable: false,
    group: false,
    label: "selected"
};
const collapseOptoinsDefault = {
    enable: false,
    label: "children",
    uniqueId: "id",
    headers: []
};

import { isEqual } from "lodash/core";

export default {
    name: "a-v-datatable",
    components: {
        aVDatatableHeaderRow,
        aVDatatableBodyRow
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
            required: true,
            default: () => []
        },

        // Select Options
        selectOptions: {
            type: Object,
            default: () => selectOptionsDefault
        },
        value: {
            type: null,
            default: () => []
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
        uniqueId: {
            type: String,
            default: () => "id"
        }
    },
    data: () => ({
        headerStatus: 0,
        rows: null
    }),
    created() {
        const props = this.$props;
        // set default headers value if no collapse option headers was implement
        collapseOptoinsDefault.headers = props.headers;

        // combine default props with enterd props
        getPropsObj(props.headerOptions, headerOptionsDefault);
        getPropsObj(props.selectOptions, selectOptionsDefault);
        getPropsObj(props.collapseOptoins, collapseOptoinsDefault);

        this.rows = props.items.map(row => {
            const { obj, selected } = createRow(row, props);
            if (selected) {
                this.headerStatus++;
            }
            return obj;
        });
    },
    // setup(props) {
    //     // set default headers value if no collapse option headers was implement
    //     collapseOptoinsDefault.headers = props.headers;

    //     // combine default props with enterd props
    //     getPropsObj(props.headerOptions, headerOptionsDefault);
    //     getPropsObj(props.selectOptions, selectOptionsDefault);
    //     getPropsObj(props.collapseOptoins, collapseOptoinsDefault);

    //     const rows = ref(
    //         props.items.map(row => {
    //             const { obj, selected } = createRow(row, props);
    //             if (selected) {
    //                 this.headerStatus++;
    //             }
    //             return obj;
    //         })
    //     );
    //     return { rows: rows.value };
    // },
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
                    return isEqual(this.reduce(row.row), val);
                } else {
                    return isEqual(row.row, val);
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
        },
        add(row, parentId) {
            if (this.collapseOptoins.enable && parentId) {
                const index = this.rows.findIndex(
                    r => r.row[this.uniqueId] == parentId
                );
                if (index != -1) {
                    if (this.rows[index].open) {
                        this.$refs["sub-table_row" + parentId][0].add(row);
                    } else {
                        this.items[index][this.collapseOptoins.label].unshift(
                            row
                        );
                    }
                } else {
                    this.$emit("lostId", parentId);
                    warnIndexNotFound(parentId);
                }
            } else {
                const { obj, selected } = createRow(row, this.$props);
                if (selected) {
                    this.headerStatus++;
                }
                this.items.unshift(row);
                this.rows.unshift(obj);
            }
        },
        update(id, row, parentId) {
            if (this.collapseOptoins.enable && parentId) {
                const index = this.rows.findIndex(
                    r => r.row[this.uniqueId] == parentId
                );
                if (index != -1) {
                    if (this.rows[index].open) {
                        this.$refs["sub-table_row" + parentId][0].update(
                            id,
                            row
                        );
                    } else {
                        const updatedRowIndex = this.items[index][
                            this.collapseOptoins.label
                        ].findIndex(
                            r => r[this.collapseOptoins.uniqueId] == id
                        );
                        if (updatedRowIndex != -1) {
                            Object.assign(
                                this.items[index][this.collapseOptoins.label][
                                    updatedRowIndex
                                ],
                                row
                            );
                        } else {
                            this.$emit("lostId", id);
                            warnIndexNotFound(id);
                        }
                    }
                } else {
                    this.$emit("lostId", parentId);
                    warnIndexNotFound(parentId);
                }
            } else {
                const index = this.rows.findIndex(
                    r => r.row[this.uniqueId] == id
                );
                if (index != -1) {
                    let newRow;
                    if (row.formatedRow) {
                        newRow = row.row;
                    } else {
                        newRow = row;
                    }
                    const { obj } = createRow(newRow, this.$props);
                    Object.assign(this.rows[index], obj);
                    Object.assign(this.items[index], obj.row);

                    this.$emit("update", this.rows[index]);
                } else {
                    this.$emit("lostId", id);
                    warnIndexNotFound(id);
                }
            }
        },
        remove(id, parentId) {
            if (this.collapseOptoins.enable && parentId) {
                const index = this.rows.findIndex(
                    r => r.row[this.uniqueId] == parentId
                );
                if (index != -1) {
                    if (this.rows[index].open) {
                        this.$refs["sub-table_row" + parentId][0].remove(id);
                    } else {
                        const itemIndex = this.items[index][
                            this.collapseOptoins.label
                        ].findIndex(
                            r => r[this.collapseOptoins.uniqueId] == id
                        );
                        if (itemIndex != -1) {
                            this.items[index][
                                this.collapseOptoins.label
                            ].splice(itemIndex, 1);
                        } else {
                            this.$emit("lostId", id);
                            warnIndexNotFound(id);
                        }
                    }
                } else {
                    this.$emit("lostId", parentId);
                    warnIndexNotFound(parentId);
                }
            } else {
                const index = this.rows.findIndex(
                    row => row.row[this.uniqueId] == id
                );
                if (index != -1) {
                    this.$emit("remove", this.rows[index]);
                    this.rows.splice(index, 1);
                    this.items.splice(index, 1);
                } else {
                    this.$emit("lostId", id);
                    warnIndexNotFound(id);
                }
            }
        },
        details(row) {
            this.$emit("details", row);
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/main.scss";
</style>
