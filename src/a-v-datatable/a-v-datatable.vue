<template>
  <div class="vc__table-container" :class="classes">
    <table class="vc__table" border="0" cellspacing="0" cellpadding="0">
      <thead class="vc__table__thead">
        <a-v-datatable-header-row
          :row="headers"
          :label="headerOptions.label"
          :value="headerOptions.value"
          :collapseOptions="collapseOptions"
          :selectOptions="selectOptions"
          @changeHeaderCheckbox="changeHeaderCheckbox(rows, $event)"
          :isCollapse="collapseOptions.enable"
          :headerStatus="
            !headerStatus ? -1 : headerStatus == rows.length ? 1 : 0
          "
        >
          <template slot="header-select-input" slot-scope="{ row, check }">
            <slot name="header-select-input" :row="row" :check="check"></slot>
          </template>
          <template slot="header-th" slot-scope="{ th }">
            <slot name="header-th" :th="th"></slot>
          </template>
          <template
            v-for="th in headers"
            :slot="'header-th.' + th[headerOptions.value]"
          >
            <slot
              :name="'header-th.' + th[headerOptions.value]"
              :th="th"
              :label="th[headerOptions.label]"
            ></slot>
          </template>
        </a-v-datatable-header-row>
      </thead>
      <transition name="slide">
        <tbody v-if="rows && rows.length" class="vc__table__tbody">
          <template
            v-for="(row, index) in !$attrs.isChild && paginationOptions.enable
              ? activeRow
              : rows"
          >
            <a-v-datatable-body-row
              :headerOptions="headerOptions"
              :row="row"
              :rowIndex="index"
              :selectOptions="selectOptions"
              :key="row.id"
              :collapseOptions="collapseOptions"
              :isCollapse="collapseOptions.enable"
              :headerStatus="
                !headerStatus ? -1 : headerStatus == rows.length ? 1 : 0
              "
              @changeCheckbox="changeCheckbox(row)"
              @remove="remove(row.row[uniqueId])"
              @details="details"
            >
              <template slot="body-select-input" slot-scope="{ row, check }">
                <slot name="body-select-input" :row="row" :check="check">
                </slot>
              </template>
              <!-- tr = row -->
              <template
                slot="row-td.actions"
                slot-scope="{ remove, details, row }"
              >
                <slot
                  name="row-td.actions"
                  :remove="remove"
                  :details="details"
                  :row="row"
                ></slot>
              </template>
              <template slot="remove" slot-scope="{ row, remove }">
                <slot name="remove" :remove="remove" :row="row"></slot>
              </template>
              <template slot="details" slot-scope="{ row, details }">
                <slot name="details" :details="details" :row="row"></slot>
              </template>
              <!-- / selection input cells -->
              <!-- default rows rows -->
              <template slot="row-td" slot-scope="{ value, argkey }">
                <slot
                  name="row-td"
                  :row="row"
                  :value="value"
                  :argkey="argkey"
                ></slot>
              </template>
              <template
                v-for="(td, key) in row.formattedRow"
                :slot="'row-td.' + key"
                slot-scope="{ value }"
              >
                <slot :name="'row-td.' + key" :value="value" :row="row"></slot>
              </template>
              <template slot="collapse-icon">
                <slot name="collapse-icon"></slot>
              </template>
              <!-- / default rows rows -->
            </a-v-datatable-body-row>
            <td
              colspan="100%"
              v-if="row.row[collapseOptions.label]"
              :key="'collapse-tr-' + index"
            >
              <transition name="slide">
                <div
                  class="collapse-tr"
                  v-if="
                    collapseOptions.enable &&
                    row.row[collapseOptions.label] &&
                    row.open
                  "
                >
                  <a-v-datatable
                    :headers="collapseOptions.headers"
                    :headerOptions="headerOptions"
                    :items="row.row[collapseOptions.label]"
                    :key="row.id"
                    :selectOptions="selectOptions"
                    :classes="classes"
                    :ref="'sub-table_row' + row.row[uniqueId]"
                    :uniqueId="collapseOptions.uniqueId"
                    :reduce="reduce"
                    :value="_value.findIndex ? _value : _value[row.row[uniqueId]]"
                    @input="
                      _value.findIndex
                        ? (_value = $event)
                        : $set(_value, row.row[uniqueId], $event)
                    "
                    @details="details"
                    :isChild="true"
                  >
                    <!-- headers slots -->
                    <template
                      slot="header-select-input"
                      slot-scope="{ row, check }"
                    >
                      <slot
                        :name="collapseOptions.label + '.header-select-input'"
                        :row="row"
                        :check="check"
                      ></slot>
                    </template>
                    <template slot="header-th" slot-scope="{ th }">
                      <slot
                        :name="collapseOptions.label + '.header-th'"
                        :th="th"
                      ></slot>
                    </template>
                    <template
                      v-for="th in collapseOptions.headers"
                      :slot="'header-th.' + th[headerOptions.value]"
                    >
                      <slot
                        :name="
                          collapseOptions.label +
                          '.header-th.' +
                          th[headerOptions.value]
                        "
                        :th="th"
                        :label="th[headerOptions.label]"
                      ></slot>
                    </template>
                    <!-- body slots -->
                    <!-- selection input cells -->
                    <template
                      slot="body-select-input"
                      slot-scope="{ row, check }"
                    >
                      <slot
                        :name="collapseOptions.label + '.body-select-input'"
                        :row="row"
                        :check="check"
                      >
                      </slot>
                    </template>
                    <template slot="collapse-icon">
                      <slot
                        :name="collapseOptions.label + '.collapse-icon'"
                      ></slot>
                    </template>
                    <!-- / selection input cells -->
                    <!-- default rows rows -->
                    <template slot="row-td" slot-scope="{ value, argkey }">
                      <slot
                        :name="collapseOptions.label + '.row-td'"
                        :row="row"
                        :value="value"
                        :argkey="argkey"
                      ></slot>
                    </template>
                    <template
                      v-for="td in collapseOptions.headers"
                      :slot="'row-td.' + td.value"
                      slot-scope="{ value }"
                    >
                      <slot
                        :name="collapseOptions.label + '.row-td.' + td.value"
                        :value="value"
                        :row="row"
                      ></slot>
                    </template>
                    <template
                      slot="row-td.actions"
                      slot-scope="{ remove, details, row }"
                    >
                      <slot
                        :name="collapseOptions.label + '.row-td.actions'"
                        :remove="remove"
                        :details="details"
                        :row="row"
                      ></slot>
                    </template>
                    <template slot="remove" slot-scope="{ row, remove }">
                      <slot
                        :name="collapseOptions.label + '.remove'"
                        :remove="remove"
                        :row="row"
                      ></slot>
                    </template>
                    <template slot="details" slot-scope="{ row, details }">
                      <slot
                        :name="collapseOptions.label + '.details'"
                        :details="details"
                        :row="row"
                      ></slot>
                    </template>
                    <!-- / default rows rows -->
                  </a-v-datatable>
                </div>
              </transition>
            </td>
          </template>
        </tbody>
        <caption v-else>
          <slot name="empty"> No items was found </slot>
        </caption>
      </transition>
      <tfoot>
        <td
          colspan="100%"
          v-if="!$attrs.isChild && paginationOptions.enable && rows.length"
        >
          <div class="pagination">
            <slot name="pagination">
              <a-pagination
                :pageLength="paginationOptions.pageLength"
                :items="rows"
                v-model="activeRow"
              >
                <template
                  slot="pagination"
                  slot-scope="{ updatePagination, activePage, length }"
                >
                  <slot
                    name="pagination"
                    :updatePagination="updatePagination"
                    :activePage="activePage"
                    :length="length"
                  >
                  </slot>
                </template>
                <template slot="page" slot-scope="{ page, activePage }">
                  <slot
                    name="page"
                    :activePage="activePage"
                    :page="page"
                  ></slot>
                </template>
                <template slot="page-prev" slot-scope="{ page }">
                  <slot name="page-prev" :page="page"></slot>
                </template>
                <template slot="page-next" slot-scope="{ page }">
                  <slot name="page-next" :page="page"></slot>
                </template>
              </a-pagination>
            </slot>
          </div>
          <div>
            <slot name="footer"></slot>
          </div>
        </td>
      </tfoot>
    </table>
  </div>
</template>
<script>
import aVDatatableHeaderRow from "./a-v-datatable-components/a-v-datatable-header-row";
import aVDatatableBodyRow from "./a-v-datatable-components/a-v-datatable-body-row.vue";
import aPagination from "./a-pagination";

// getPropsObj this func combine props
import { getPropsObj, createRow, warnIndexNotFound } from "@/utils";

// default props
const paginationOptionsDefault = {
  enable: false,
  pageLength: 10,
};
const headerOptionsDefault = { label: "label", value: "value" };
const selectOptionsDefault = {
  enable: false,
  label: "selected",
};
const collapseOptionsDefault = {
  enable: false,
  label: "children",
  uniqueId: "id",
  headers: [],
};

import { isEqual } from "lodash";

export default {
  name: "a-v-datatable",
  components: {
    aVDatatableHeaderRow,
    aVDatatableBodyRow,
    aPagination,
  },
  props: {
    // table header row
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    headerOptions: {
      type: Object,
      default: () => headerOptionsDefault,
    },

    // table body rows
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    uniqueId: {
      type: String,
      default: () => "id",
    },
    // Select Options
    selectOptions: {
      type: Object,
      default: () => selectOptionsDefault,
    },
    paginationOptions: {
      type: Object,
      default: () => paginationOptionsDefault,
    },
    value: {
      type: null,
      default: () => [],
    },
    reduce: {
      type: Function,
      default: () => null,
    },

    // Collapse Options
    collapseOptions: {
      type: Object,
      default: () => collapseOptionsDefault,
    },

    // styling props
    classes: {
      type: String,
    },
  },
  data: () => ({
    headerStatus: 0,
    rows: [],
    activeRow: [],
    _items: [],
    _value: [],
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      const props = this.$props;
      this._items = props.items;
      this._value = props.value;
      // set default headers value if no collapse option headers was implement
      collapseOptionsDefault.headers = props.headers;

      // combine default props with entered props
      getPropsObj(props.headerOptions, headerOptionsDefault);
      getPropsObj(props.selectOptions, selectOptionsDefault);
      getPropsObj(props.collapseOptions, collapseOptionsDefault);
      getPropsObj(props.paginationOptions, paginationOptionsDefault);

      this.rows = this._items.map((row) => {
        const { obj, selected } = createRow(row, props);
        if (selected) {
          this.headerStatus++;
        }
        return obj;
      });
    },
    changeHeaderCheckbox(rows, val) {
      rows.forEach((row) => {
        row[this.selectOptions.label] = val;
        this.changeCheckbox(row, val);
      });
    },
    changeCheckbox(row, is) {
      const index = this._value.findIndex((val) => {
        if (this.reduce(row.row) != null) {
          return isEqual(this.reduce(row.row), val);
        } else {
          return isEqual(row.row, val);
        }
      });
      if (is === undefined) {
        if (index != -1) {
          this._value.splice(index, 1);
          this.headerStatus--;
        } else {
          if (this.reduce(row.row) != null) {
            this._value.unshift(this.reduce(row.row));
          } else {
            this._value.unshift(row.row);
          }
          this.headerStatus++;
        }
      } else if (is) {
        if (index == -1) {
          if (this.reduce(row.row) != null) {
            // eslint-disable-next-line vue/no-mutating-props
            this._value.unshift(this.reduce(row.row));
          } else {
            // eslint-disable-next-line vue/no-mutating-props
            this._value.unshift(row.row);
          }
          this.headerStatus++;
        }
      } else {
        if (index != -1) {
          // eslint-disable-next-line vue/no-mutating-props
          this._value.splice(index, 1);
          this.headerStatus--;
        }
      }
      this.$emit("input", this._value);
    },
    add(row, parentId) {
      if (this.collapseOptions.enable && parentId) {
        const index = this.rows.findIndex(
          (r) => r.row[this.uniqueId] == parentId
        );
        if (index != -1) {
          if (this.rows[index].open) {
            this.$refs["sub-table_row" + parentId][0].add(row);
          } else {
            this._items[index][this.collapseOptions.label].unshift(row);
          }
        } else {
          this.$emit("lostId", parentId);
          warnIndexNotFound(parentId);
        }
      } else {
        const { obj, selected } = createRow(row, this.$props);
        if (selected) {
          this.headerStatus++;
        }
        this._items.unshift(row);
        this.rows.unshift(obj);
      }
    },
    update(id, row, parentId) {
      if (this.collapseOptions.enable && parentId) {
        const index = this.rows.findIndex(
          (r) => r.row[this.uniqueId] == parentId
        );
        if (index != -1) {
          if (this.rows[index].open) {
            this.$refs["sub-table_row" + parentId][0].update(id, row);
          } else {
            const updatedRowIndex = this._items[index][
              this.collapseOptions.label
            ].findIndex((r) => r[this.collapseOptions.uniqueId] == id);
            if (updatedRowIndex != -1) {
              Object.assign(
                this._items[index][this.collapseOptions.label][updatedRowIndex],
                row
              );
            } else {
              this.$emit("lostId", id);
              warnIndexNotFound(id);
            }
          }
        } else {
          this.$emit("lostId", parentId);
          warnIndexNotFound(parentId);
        }
      } else {
        const index = this.rows.findIndex((r) => r.row[this.uniqueId] == id);
        if (index != -1) {
          let newRow;
          if (row.formattedRow) {
            newRow = row.row;
          } else {
            newRow = row;
          }
          const { obj } = createRow(newRow, this.$props);
          Object.assign(this.rows[index], obj);
          Object.assign(this._items[index], obj.row);

          this.$emit("update", this.rows[index]);
        } else {
          this.$emit("lostId", id);
          warnIndexNotFound(id);
        }
      }
    },
    remove(id, parentId) {
      if (this.collapseOptions.enable && parentId) {
        const index = this.rows.findIndex(
          (r) => r.row[this.uniqueId] == parentId
        );
        if (index != -1) {
          if (this.rows[index].open) {
            this.$refs["sub-table_row" + parentId][0].remove(id);
          } else {
            const itemIndex = this._items[index][
              this.collapseOptions.label
            ].findIndex((r) => r[this.collapseOptions.uniqueId] == id);
            if (itemIndex != -1) {
              this.changeCheckbox(
                this._items[index][this.collapseOptions.label][itemIndex],
                false
              );
              this._items[index][this.collapseOptions.label].splice(
                itemIndex,
                1
              );
            } else {
              this.$emit("lostId", id);
              warnIndexNotFound(id);
            }
          }
        } else {
          this.$emit("lostId", parentId);
          warnIndexNotFound(parentId);
        }
      } else {
        const index = this.rows.findIndex(
          (row) => row.row[this.uniqueId] == id
        );
        if (index != -1) {
          this.rows[index].row[this.collapseOptions.label] &&
            this.rows[index].row[this.collapseOptions.label].forEach((r) => {
              this.changeCheckbox({ row: r }, false);
            });
          this.changeCheckbox(this.rows[index], false);
          this.$emit("remove", this.rows[index]);
          this.rows.splice(index, 1);
          this._items.splice(index, 1);
        } else {
          this.$emit("lostId", id);
          warnIndexNotFound(id);
        }
      }
    },
    details(row) {
      this.$emit("details", row);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/main.scss";
</style>
