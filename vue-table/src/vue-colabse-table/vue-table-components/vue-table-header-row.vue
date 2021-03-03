<template>
    <tr class="vc__table__tr vc__thead__tr">
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
        value: String
    }
};
</script>
