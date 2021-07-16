<template>
    <tr class="vc__table__tr vc__thead__tr">
        <th v-if="selectOptions.enable" class="selection" id="header-select-input">
            <slot name="header-select-input">
                <input type="checkbox">
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
        selectOptions: {
            type: Object,
            default: () => ({
                enable: false
            })
        }
    },
    mounted() {
        const headerSelectInput = document.getElementById('header-select-input').children[0]
        if(headerSelectInput) {
            if(headerSelectInput.getAttribute('type') != 'checkbox') {
                console.warn('[vue-datatable] slot "header-select-input" expect checkbox element')
            } else {
                headerSelectInput.addEventListener('change', () => {
                    this.$emit('changeHeaderCheckbox')
                });
            }
        }
    }
};
</script>
