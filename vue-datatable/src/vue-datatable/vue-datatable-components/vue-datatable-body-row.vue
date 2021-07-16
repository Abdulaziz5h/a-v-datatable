<template>
    <tr
        class="vc__table__tr vc__tbody__tr"
    >
        <td v-if="selectOptions.enable" class="selection" :id="['body-select-input-' + rowIndex]">
            <slot name="body-select-input">
                <input type="checkbox">
            </slot>
        </td>
        <slot
            v-for="(th, index) in header.headers"
            name="row-td"
            :value="th[header.value]"
        >
            <td :key="index">
                <slot :name="'row-td.' + th[header.value]">
                    {{ item[th[header.value]] }}
                </slot>
            </td>
        </slot>
    </tr>
</template>

<script>
export default {
    props: {
        item: Object,
        header: Object,
        rowIndex: Number,
        selectOptions: {
            type: Object,
            default: () => ({
                enable: false
            })
        }
    },
    mounted() {
        const bodySelectInput = document.getElementById('body-select-input-' + this.rowIndex).children[0]
        if(bodySelectInput) {
            if(bodySelectInput.getAttribute('type') != 'checkbox') {
                console.warn('[vue-datatable] slot "body-select-input" expect checkbox element')
            } else {
                bodySelectInput.addEventListener('change', () => {
                    this.$emit('changeCheckbox')
                });
            }
        }
    }
}
</script>