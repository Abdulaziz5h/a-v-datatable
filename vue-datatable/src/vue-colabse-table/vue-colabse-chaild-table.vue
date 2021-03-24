<template>
    <tr>
        <td colspan="100%" style="overflow: hidden">
            <transition name="slide">
                <table
                    v-if="open"
                    class="vc__table"
                    :class="[{ borderd: !!borderd }, tableClass]"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                >
                    <thead class="vc__table__thead" v-if="!!isHeader">
                        <slot name="header">
                            <tr
                                class="vc__table__tr vc__thead__tr"
                                :class="[theadRowClass]"
                                :style="[align]"
                            >
                                <th v-if="selectOptions.enable && !!item[this.childrenLabel]" class="selection"></th>
                                <th
                                    v-for="(th, index) in headers"
                                    :key="'sub_th_' + index"
                                >
                                    {{ th[label] }}
                                </th>
                            </tr>
                        </slot>
                    </thead>
                    <caption v-if="!item[this.childrenLabel] || !item[this.childrenLabel].length">
                        لا يوجد بيانات
                    </caption>
                    <tbody v-else class="vc__table__tbody">
                        <slot name="body">
                            <tr
                                class="vc__table__tr vc__tbody__tr"
                                :class="[theadRowClass]"
                                :style="[align]"
                                v-for="(tr, index) in item[this.childrenLabel]"
                                :key="'sub_tr_' + (mainTableLength + index)"
                            >
                                <td v-if="selectOptions.enable" class="selection">
                                    <input type="checkbox" :checked="tr[selectOptions.label]" @change="selectChange(tr)">
                                </td>
                                <td
                                    v-for="(th, i) in headers"
                                    :key="tr[th.value] + i"
                                >
                                    {{ tr[th.value] }}
                                </td>
                            </tr>
                        </slot>
                    </tbody>
                    <slot name="footer"></slot>
                </table>
            </transition>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        // options
        open: Boolean,
        selectOptions: Object,

        // style
        align: Object,
        mainTableLength: Number,
        isHeader: Boolean,

        // table header row
        headers: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        // table body rows
        item: {
            type: Object,
            required: true
        },
        childrenLabel: String,
        // custom classes
        tableClass: Array,
        theadRowClass: Array,
        tbodyRowClass: Array,
        borderd: Boolean,
    },
    computed: {
        selectedLabel: function() {
            return !this.selectOptions.label ? 'selected' : this.selectOptions.label
        }
    },
    methods: {
        async selectChange(tr) {
            await this.$set(
                tr,
                this.selectedLabel,
                !tr[this.selectedLabel]
            )
            this.$emit('selectChange', tr, 0)
            const selectedLength = this.item[this.childrenLabel].filter((row) => {
                return row[this.selectedLabel]
            })
            if(selectedLength.length == 0) {
                this.$set(
                    this.item,
                    this.selectedLabel,
                    false
                )
            } else if(selectedLength.length == this.item[this.childrenLabel].length) {
                this.$set(
                    this.item,
                    this.selectedLabel,
                    true
                )
            }
        }
    }
};
</script>
