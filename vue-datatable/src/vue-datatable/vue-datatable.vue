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
                    <vue-datatable-header-row 
                        :row="header.headers"
                        :label="header.label"
                        :value="header.value"
                        :selectOptions="selectOptions"

                        @changeHeaderCheckbox="changeHeaderCheckbox"
                    >
                        <template slot="header-th" slot-scope="{th}">
                            <slot name="header-th" :th="th"></slot>
                        </template>
                        <template v-for="th in header.headers" :slot="'header-th.' + th[header.value]">
                            <slot :name="'header-th.' + th[header.value]" :th="th" :label="th[header.label]"></slot>
                        </template>
                    </vue-datatable-header-row>
                </slot>
            </thead>
            <transition name="slide">
                <caption v-if="!items.length">
                    لا يوجد بيانات
                </caption>
                <tbody v-else class="vc__table__tbody">
                    <slot name="body">
                        <template v-for="(item, index) in items">
                            <vue-datatable-body-row
                                :header="header"
                                :item="item"
                                :selectOptions="selectOptions"
                                :key="index"
                                :rowIndex="index"

                                @changeCheckbox="changeCheckbox(item)"
                            >
                            <!-- selection input cells -->
                                <template slot="header-select-input">
                                    <slot name="header-select-input"></slot>
                                </template>
                                <template slot="body-select-input">
                                    <slot name="body-select-input" :row="item"></slot>
                                </template>
                            <!-- / selection input cells -->
                            <!-- default rows items -->
                                <template slot="row-td" slot-scope="{value}">
                                    <slot name="row-td" :row="item" :value="value"></slot>
                                </template>
                                <template v-for="th in header.headers" :slot="'row-td.' + th[header.value]">
                                    <slot :name="'row-td.' + th[header.value]" :row="item" :td="item[th[header.value]]" :value="th[header.value]"></slot>
                                </template>
                            <!-- / default rows items -->
                            </vue-datatable-body-row>
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
import vueDatatableHeaderRow from "./vue-datatable-components/vue-datatable-header-row";
import vueDatatableBodyRow from "./vue-datatable-components/vue-datatable-body-row.vue";

export default {
    components: {
        vueDatatableHeaderRow,
        vueDatatableBodyRow,
        // vueColabseChaildTable
    },
    data: () => ({
        selectAll: false,
        selected: []
    }),
    props: {
        label: {
            type: String,
            required: true
        },
        // table header row
        header: {
            type: Object,
            required: true,
            default() {
                return {
                    headers: [],
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

        // Select Options
        selectOptions: {
            type: Object,
            default: () => ({
                enable: false
            })
        },
        selectedList: {
            type: Array,
            default: () => []
        },
        reduce: {
            type: Function,
            default: () => null
        },

        // Collapse Options
        collapseOptions: Object,

        
        // style
        align: String,
        // custom classes
        tableClass: Array,
        theadRowClass: Array,
        tbodyRowClass: Array,
        borderd: Boolean,
        striped: Boolean,

        
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
        async changeHeaderCheckbox() {
            this.selected = []
            if(!this.selectAll) {
                if(this.reduce({}) != null) {
                    await this.items.forEach(item => {
                        this.selected[this.selected.length] = this.reduce(item)
                    })
                } else {
                    this.selected = this.items
                }
            }
            this.selectAll = !this.selectAll
            this.$emit('changeCheckbox', this.selected)
        },
        changeCheckbox(item) {
            if(this.reduce(item) != null) {
                // here should check if object is equal to another object
                const index = this.selected.findIndex((s) => s == this.reduce(item))
                if(index != -1) {
                    this.selected.splice(index, 1)
                } else {
                    this.selected[this.selected.length] = this.reduce(item)
                }
            } else {
                const index = this.selected.findIndex((s) => s[this.label] == item[this.label])
                if(index != -1) {
                    this.selected.splice(index, 1)
                } else {
                    this.selected.push(item)
                }
            }
            this.$emit('changeCheckbox', this.selected)
        },





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