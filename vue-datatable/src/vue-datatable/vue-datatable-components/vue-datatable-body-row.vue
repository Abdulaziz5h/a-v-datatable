<template>
<tr
    class="vc__table__tr vc__tbody__tr"
>
    <td v-if="selectOptions.enable" class="selection">
        <slot name="body-select-input">
            <input type="checkbox" v-model="row[selectOptions.label]">
        </slot>
    </td>
    <slot
        v-for="(td, key, index) in row.formatedRow"
        name="row-td"
        :argkey="key"
        :value="td"
    >
        <td :key="index">
            <slot :name="'row-td.' + key"
                :value="td"
            >
                {{ td }}
            </slot>
        </td>
    </slot>
</tr>
</template>

<script>
export default {
    props: {
        row: Object,
        headerOptions: Object,
        selectOptions: Object,
    },
    methods: {
        chainge(row, e) {
            row[this.selectOptions.label] = e.target.value
        }
    },
    watch: {
        'row': {
            handler() {
                this.$emit('changeCheckbox')
            },
            deep: true
        }
    }
}
</script>