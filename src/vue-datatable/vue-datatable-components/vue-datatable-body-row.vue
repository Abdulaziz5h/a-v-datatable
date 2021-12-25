<template>
    <tr class="vc__table__tr vc__tbody__tr">
        <td
            v-if="
                selectOptions.enable &&
                    (!collapseOptoins.enable ||
                        (collapseOptoins.enable &&
                            !row.row[collapseOptoins.label]))
            "
            class="selection"
        >
            <slot name="body-select-input">
                <input
                    type="checkbox"
                    v-model="row[selectOptions.label]"
                    @input="selectRow(row, $event)"
                />
            </slot>
        </td>
        <slot
            v-for="(td, key, index) in row.formatedRow"
            name="row-td"
            :argkey="key"
            :value="td"
        >
            <td :key="index" v-if="key == 'actions'">
                <slot name="row-td.actions" :tr="row">
                    <slot name="remove">
                        <button @click="remove" style="margin-right: 4px">
                            X
                        </button>
                    </slot>
                    <slot name="details">
                        <button @click="details">
                            D
                        </button>
                    </slot>
                </slot>
            </td>
            <td @click="change(row)" :key="index" v-else>
                <slot :name="'row-td.' + key" :value="td">
                    {{ td }}
                </slot>
            </td>
        </slot>
        <td
            @click="change(row)"
            v-if="isCollapse"
            :key="row.length"
            class="colapse-icon"
        >
            <div class="icon">
                <span :class="{ colapsed: row.open }">
                    <slot name="collapse-icon"
                        ><span style="height: 10px; display: block;"
                            >^</span
                        ></slot
                    >
                </span>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        row: Object,
        headerOptions: Object,
        selectOptions: Object,
        collapseOptoins: Object,
        isCollapse: Boolean
    },
    methods: {
        change(row) {
            row.open = !row.open;
        },
        selectRow() {
            this.$emit("changeCheckbox");
        },
        remove() {
            this.$emit("remove");
        },
        details() {
            this.$emit("details", this.row);
        }
    }
};
</script>
