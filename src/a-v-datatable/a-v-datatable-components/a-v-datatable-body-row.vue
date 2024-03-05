<template>
  <tr class="vc__table__tr vc__tbody__tr">
    <td
      v-if="selectOptions.enable && !collapseOptions.enable"
      class="selection"
    >
      <slot name="body-select-input" :row="row" :check="check">
        <div class="selection-container">
          <!-- eslint-disable vue/no-mutating-props -->
          <input
            type="checkbox"
            v-model="row[selectOptions.label]"
            @input="selectRow(row, $event)"
          />
          <!-- eslint-enable vue/no-mutating-props -->
        </div>
      </slot>
    </td>
    <slot
      v-for="(td, key, index) in row.formattedRow"
      name="row-td"
      :argkey="key"
      :value="td"
    >
      <td :key="index" v-if="key == 'actions'">
        <slot
          name="row-td.actions"
          :remove="remove"
          :details="details"
          :row="row"
        >
          <slot name="remove" :row="row" :remove="remove">
            <button @click="remove" style="margin-right: 4px">X</button>
          </slot>
          <slot name="details" :row="row" :details="details">
            <button @click="details">D</button>
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
      v-if="isCollapse && row.row[collapseOptions.label]"
      :key="row.length"
      class="collapse-icon"
    >
      <div class="collapse-icon-i">
        <span :class="{ collapsed: row.open }">
          <slot name="collapse-icon"
            ><span style="height: 10px; display: block">^</span></slot
          >
        </span>
      </div>
    </td>
    <td
      v-else-if="
        selectOptions.enable &&
        !(selectOptions.enable && !collapseOptions.enable)
      "
      class="selection"
    >
      <slot name="body-select-input" :row="row" :check="check">
        <div class="selection-container">
          <!-- eslint-disable vue/no-mutating-props -->
          <input
            v-model="row[selectOptions.label]"
            type="checkbox"
            @input="selectRow(row, $event)"
          />
          <!-- eslint-enable vue/no-mutating-props -->
        </div>
      </slot>
    </td>
    <td v-else-if="collapseOptions.enable"></td>
  </tr>
</template>

<script>
export default {
  props: {
    row: Object,
    headerOptions: Object,
    selectOptions: Object,
    collapseOptions: Object,
    isCollapse: Boolean,
  },
  methods: {
    check() {
      // eslint-disable-next-line vue/no-mutating-props
      this.row[this.selectOptions.label] = !this.row[this.selectOptions.label];
      this.selectRow(this.row, this.row[this.selectOptions.label]);
    },
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
    },
  },
};
</script>
