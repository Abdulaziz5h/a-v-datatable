<template>
  <tr class="vc__table__tr vc__thead__tr">
    <th
      class="selection"
      v-if="selectOptions.enable"
    >
      <slot name="header-select-input" :row="row" :check="check">
        <div class="checkbox-container">
          <input type="checkbox" v-model="selectAll" />
          <span class="bar" v-if="!headerStatus"></span>
        </div>
      </slot>
    </th>
    <slot v-for="(th, index) in row" name="header-th" :th="th">
      <th :key="index">
        <slot :name="['header-th.' + th[value]]">
          {{ th[label] }}
        </slot>
      </th>
    </slot>
    <th v-if="isCollapse" :key="row.length" class="collapse-th"></th>
  </tr>
</template>
<script>
export default {
  props: {
    row: Array,
    label: String,
    value: String,
    selectOptions: Object,
    isCollapse: Boolean,
    collapseOptions: Object,
    headerStatus: Number,
    isChild: Boolean,
  },
  data: () => ({
    selectAll: false,
    // in cause of clear one of sub checks
    // to prevent file selectAll watcher
    flag: true,
  }),
  created() {
    this.headerStatusMethod(this.headerStatus);
  },
  methods: {
    check() {
      this.selectAll = !this.selectAll;
    },
    headerStatusMethod(l) {
      if (l == 1) {
        this.selectAll = true;
      } else {
        this.flag = false;
        this.selectAll = false;
      }
      // in cause of clear one of sub checks
      setTimeout(() => {
        this.flag = true;
      });
    }
  },
  watch: {
    selectAll(val) {
      if (this.flag) this.$emit("changeHeaderCheckbox", val);
    },
    headerStatus(l) {
      this.headerStatusMethod(l);
    },
  },
};
</script>

<style scoped lang="scss">
.checkbox-container {
  position: relative;
  width: 26px;
  height: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .bar {
    position: absolute;
    top: 9px;
    left: 9px;
    width: 9px;
    height: 3px;
    background: #212121;
    display: block;
    pointer-events: none;
  }
}
</style>
