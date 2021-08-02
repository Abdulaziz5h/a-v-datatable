<template>
    <tr class="vc__table__tr vc__thead__tr">
        <th v-if="selectOptions.enable" class="selection">
            <slot name="header-select-input">
                <input type="checkbox" v-model="selectAll">
            </slot>
        </th>
        <slot v-for="(th, index) in row" name="header-th" :th="th">
            <th :key="index">
                <slot :name="['header-th.' + th[value]]">
                    {{ th[label] }}
                </slot>
            </th>
        </slot>
    </tr>
</template>
<script>
export default {
    props: {
        row: Array,
        label: String,
        value: String,
        selectOptions: Object
    },
    data: () => ({
        selectAll: false
    }),
    watch: {
        selectAll(val) {
            this.$emit('changeHeaderCheckbox', val)
        }
    }
};
</script>
