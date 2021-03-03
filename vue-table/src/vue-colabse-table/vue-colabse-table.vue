<template>
    <div class="vc__table-container" :class="[{ borderd: !!borderd }]">
        <table
            class="vc__table"
            :class="[tableClass]"
            border="0"
            cellspacing="0"
            cellpadding="0"
        >
            <thead class="vc__table__thead">
                <slot name="header">
                    <vue-table-header-row :row="headers.rowItem" :label="headers.label" :value="headers.value">
                        <template v-for="th in headers.rowItem" :slot="'header-th.' + th[headers.value]">
                            <slot :name="'header-th.' + th[headers.value]" :th="th[headers.label]"></slot>
                        </template>
                        <template slot="header-th" slot-scope="{th}">
                            <slot name="header-th" :th="th"></slot>
                        </template>
                    </vue-table-header-row>
                </slot>
            </thead>
            <!-- <transition name="slide">
                <caption v-if="!rows.length">
                    لا يوجد بيانات
                </caption>
                <tbody v-else class="vc__table__tbody">
                    <slot name="body">
                        <template v-for="(tr, index) in rows">
                            <tr
                                class="vc__table__tr vc__tbody__tr"
                                :class="[theadRowClass]"
                                :style="[vc__align]"
                                :key="'tr_' + index"
                                :ref="'tr-' + index"
                            >
                                <td
                                    v-if="selectOptions.enable"
                                    class="selection"
                                >
                                    <input
                                        v-if="tr[childrenLabel]"
                                        type="checkbox"
                                        :checked="tr[selectOptions.label]"
                                        @change="selectChange(tr)"
                                    />
                                </td>
                                <td
                                    @click="toggleChildren(index)"
                                    v-for="(th, i) in headers"
                                    :key="'td_' + i"
                                >
                                    {{ tr[th.value] }}
                                </td>
                                <td
                                    @click="toggleChildren(index)"
                                    v-if="collapseOptions.enable"
                                    class="colapse-icon"
                                >
                                    <span
                                        class="icon"
                                        :class="{ colapsed: tr.isOpen }"
                                    >
                                        <slot name="colapse-icon">
                                            ^
                                        </slot>
                                    </span>
                                </td>
                            </tr>
                        </template>
                    </slot>
                </tbody>
            </transition> -->
            <slot name="footer"></slot>
        </table>
    </div>
</template>
<script>
// import vueColabseChaildTable from "./vue-colabse-chaild-table";
import vueTableHeaderRow from "./vue-table-components/vue-table-header-row.vue";
// todo: link attr striped
export default {
    components: {
        vueTableHeaderRow,
        // vueColabseChaildTable
    },
    data: () => ({
        selectAll: false
    }),
    props: {
        
        // table header row
        headers: {
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
        label: {
            type: String,
            required: true
        },
        // table body rows
        items: {
            type: Array,
            required: true
        },
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

        
        // Collapse Options
        collapseOptions: Object,

        // Select Options
        selectOptions: Object,

        
    },
    computed: {
        rows: function() {
            return this.items.filter(item => {
                item = Object.assign({}, item, { isOpen: false });
                return item;
            });
        },
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