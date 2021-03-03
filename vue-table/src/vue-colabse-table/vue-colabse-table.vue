<template>
    <div class="vc__table-container">
        <table
            class="vc__table"
            border="0"
            cellspacing="0"
            cellpadding="0"
        >
            <thead class="vc__table__thead">
                <slot name="header">
                    <vue-table-header-row :row="header.rowItem" :label="header.label" :value="header.value">
                        <template slot="header-th" slot-scope="{th}">
                            <slot name="header-th" :th="th"></slot>
                        </template>
                        <template v-for="th in header.rowItem" :slot="'header-th.' + th[header.value]">
                            <slot :name="'header-th.' + th[header.value]" :th="th" :label="th[header.label]"></slot>
                        </template>
                    </vue-table-header-row>
                </slot>
            </thead>
            <transition name="slide">
                <caption v-if="!items.length">
                    لا يوجد بيانات
                </caption>
                <tbody v-else class="vc__table__tbody">
                    <slot name="body">
                        <template v-for="(item, index) in items">
                            <vue-table-body-row :key="index" :item="item" :header="header">
                                <template slot="row-td" slot-scope="{value}">
                                    <slot name="row-td" :row="item" :value="value"></slot>
                                </template>
                                <template v-for="th in header.rowItem" :slot="'row-td.' + th[header.value]">
                                    <slot :name="'row-td.' + th[header.value]" :row="item" :td="item[th[header.value]]" :value="th[header.value]"></slot>
                                </template>
                            </vue-table-body-row>
                        </template>
                    </slot>
                </tbody>
            </transition>
            <slot name="footer"></slot>
        </table>
    </div>
</template>
<script>
// import vueColabseChaildTable from "./vue-colabse-chaild-table";
import vueTableHeaderRow from "./vue-table-components/vue-table-header-row.vue";
import vueTableBodyRow from "./vue-table-components/vue-table-body-row.vue";

export default {
    components: {
        vueTableHeaderRow,
        vueTableBodyRow,
        // vueColabseChaildTable
    },
    data: () => ({
        selectAll: false
    }),
    props: {
        // table header row
        header: {
            type: Object,
            required: true,
            default() {
                return {
                    rowItem: [],
                    label: 'label',
                    value: 'value'
                }
            }
        },
        
        // table body rows
        items: {
            type: Array,
            required: true,
        },




        // Collapse Options
        collapseOptions: Object,

        value: {
            type: Array
        },
        
        // style
        align: String,
        // custom classes
        tableClass: Array,
        theadRowClass: Array,
        tbodyRowClass: Array,
        borderd: Boolean,
        striped: Boolean,
        // Select Options
        selectOptions: Object,

        
    },
    computed: {
        vc__align: function() {
            return !this.align ? "" : { "text-align": this.align };
        },
        selectedLabel: function() {
            return !this.selectOptions.label
                ? "selected"
                : this.selectOptions.label;
        },
        childrenLabel: function() {
            return !this.collapseOptions.childrenLabel
                ? "children"
                : this.collapseOptions.childrenLabel;
        }
    },
    methods: {
        toggleChildren(index) {
            this.$set(this.rows[index], "isOpen", !this.rows[index].isOpen);
        },
        selectChange(tr) {
            const selectValue = !tr[this.selectedLabel];
            this.$set(tr, this.selectedLabel, selectValue);
            if(tr[this.childrenLabel] != null && tr[this.childrenLabel] != undefined) {
                tr[this.childrenLabel].forEach(child => {
                    this.$set(child, this.selectedLabel, selectValue);
                });
                this.select(tr, 1);
            }
        },
        select(obj, type) {
            if (type && obj[this.selectedLabel]) {
                obj[this.childrenLabel].forEach(child => {
                    if (child[this.selectedLabel]) {
                        this.value.unshift(child);
                    }
                });
            } else if (type) {
                obj[this.childrenLabel].forEach(child => {
                    if(this.value != null && this.value != undefined) {
                        this.value.forEach((item, index, list) => {
                            if (JSON.stringify(item) === JSON.stringify(child)) {
                                list.splice(index, 1);
                            }
                        });
                    }
                });
            } else if (!type && obj[this.selectedLabel]) {
                this.value.unshift(obj);
            } else {
                if(this.value != null && this.value != undefined) {
                    this.value.map((item, index, list) => {
                        if (JSON.stringify(item) === JSON.stringify(obj)) {
                            list.splice(index, 1);
                        }
                    });
                }
            }
        }
    },
    watch: {
        selectAll(val) {
            this.rows.forEach(row => {
                this.$set(row, this.selectedLabel, val);
                if(row[this.childrenLabel] != null && row[this.childrenLabel] != undefined) {
                    row[this.childrenLabel].forEach(child => {
                        this.$set(child, this.selectedLabel, val);
                    });
                    this.select(row, 1);
                }
            });
        }
    }
};
</script>




<!-- <vueColabseChaildTable
                                v-if="collapseOptions.enable"
                                :key="'sub_table_' + index"
                                :label="
                                    !collapseOptions.customHeaderLabel
                                        ? label
                                        : collapseOptions.customHeaderLabel
                                "
                                :open="tr.isOpen"
                                :selectOptions="selectOptions"
                                :mainTableLength="rows.length"
                                :align="vc__align"
                                :childrenLabel="childrenLabel"
                                @selectChange="select"
                                :isHeader="collapseOptions.enableCustomHeadre"
                                :headers="
                                    !!(
                                        !!collapseOptions &&
                                        !!collapseOptions.header &&
                                        collapseOptions.header.length
                                    )
                                        ? collapseOptions.header
                                        : headers
                                "
                                :item="tr"
                                :borderd="!!borderd"
                            /> -->