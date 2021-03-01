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
                                <th
                                    v-for="(th, index) in headers"
                                    :key="'sub_th_' + index"
                                >
                                    {{ th[label] }}
                                </th>
                            </tr>
                        </slot>
                    </thead>
                    <caption v-if="!items">
                        لا يوجد بيانات
                    </caption>
                    <tbody v-else class="vc__table__tbody">
                        <slot name="body">
                            <tr
                                class="vc__table__tr vc__tbody__tr"
                                :class="[theadRowClass]"
                                :style="[align]"
                                v-for="(tr, index) in items"
                                :key="'sub_tr_' + (mainTableLength + index)"
                            >
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
        open: Boolean,
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
        items: {
            type: Array,
            required: true
        },
        // custom classes
        tableClass: Array,
        theadRowClass: Array,
        tbodyRowClass: Array,
        borderd: Boolean
    },
    watch: {
        open(c) {
            console.log(c);
        }
    }
};
</script>
