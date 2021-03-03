<template>
    <tr
        class="vc__table__tr vc__tbody__tr"
    >
        <slot
            v-for="(th, index) in header.rowItem"
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
    }
}
</script>