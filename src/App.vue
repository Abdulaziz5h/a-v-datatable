<template>
  <div id="app">
    <div style="padding-bottom: 40px" class="container">
      <button @click="addItem()">add</button>
      <button @click="addChild()">add child</button>
      <button @click="removeItem()">remove</button>
      <button @click="removeChild()">remove child</button>
      <button @click="update()">update</button>

      <a-v-datatable
        :headers="headers"
        :items="items"
        classes="bordered cell-bordered striped"
        v-model="model"
        :paginationOptions="{ enable: true }"
        :collapseOptions="collapseOptions"
        :selectOptions="selectOptions"
        ref="table"
        @details="log"
      >
        <!-- 
          :headerOptions="headerOptions"
          @remove="log"
          @update="log"
          @lostId="log" -->
        <!-- select1 => :reduce="(item) => item.id" -->
        <!-- select2 => :reduce="(item) => ({id: item.id, first_name: item.first_name})" -->
      </a-v-datatable>
      <pre>
        {{ model }}
      </pre>
      <footer class="footer">Developing...</footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #304455;
  color: #fff;
  padding: 8px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 2px;
}
</style>

<script>
import aVDatatable from "./a-v-datatable/a-v-datatable.vue";
import { rows, headers, subHeaders } from "@/fake-data/table-rows.js";
export default {
  name: "App",
  components: {
    aVDatatable,
  },
  data() {
    return {
      headers,
      headerOptions: {
        label: "label",
        value: "value",
      },
      items: rows,
      selectOptions: {
        enable: true,
      },
      collapseOptions: {
        enable: true,
        label: "cars",
        headers: subHeaders,
        selectOptions: {
          enable: true,
        },
      },
      model: {
        selected: [],
        selectedChildren: {},
      },
      // selected: [
      //     {
      //         id: 8,
      //         first_name: "Marjy",
      //         last_name: "Arden",
      //         email: "marden7@imdb.com",
      //         gender: "Male",
      //         cars: [
      //             {
      //                 id: 30,
      //                 make: "Ford",
      //                 model: "LTD Crown Victoria",
      //                 modelYear: 1991
      //             }
      //         ]
      //     },
      //     {
      //         id: 4,
      //         first_name: "Jason",
      //         last_name: "Wilprecht",
      //         email: "jwilprecht3@booking.com",
      //         gender: "Female",
      //         cars: [
      //             {
      //                 id: 11,
      //                 make: "GMC",
      //                 model: "Yukon Denali",
      //                 modelYear: 2006
      //             },
      //             {
      //                 id: 12,
      //                 make: "Mitsubishi",
      //                 model: "Diamante",
      //                 modelYear: 1995
      //             }
      //         ]
      //     }
      // ],
      // selected1: [24, 26, 10, 30]
      selected1: { 6: [24, 26], 3: [10], 8: [30] },
      // selected2: [
      // { id: 8, first_name: "Marjy" },
      // { id: 6, first_name: "Abbey" },
      // { id: 4, first_name: "Jason" }
      // ],
    };
  },
  methods: {
    log(a) {
      console.log(a);
    },
    addItem() {
      this.$refs.table.add({
        id: 110,
        first_name: "Cthrine",
        last_name: "Jilkes",
        email: "cjilkes0@mapy.cz",
        gender: "male",
        cars: [
          {
            id: 1,
            make: "GMC",
            model: "Yukon Denali",
            modelYear: 2006,
          },
          {
            id: 5,
            make: "Ford",
            model: "LTD Crown Victoria",
            modelYear: 1991,
          },
        ],
      });
    },
    addChild() {
      this.$refs.table.add(
        {
          id: 6,
          make: "GMC",
          model: "Yukon Denali",
          modelYear: 2006,
        },
        110
      );
    },
    removeItem() {
      this.$refs.table.remove(7);
    },
    removeChild() {
      this.$refs.table.remove(27, 7);
    },
    update() {
      this.$refs.table.update(
        27,
        {
          id: 27,
          make: "wwwwwwwwww",
          model: "wwwwwwwwwwwww",
          modelYear: 1002,
        },
        7
      );
    },
  },
  watch: {
    // selected(s) {
    //     // console.log(s);
    // }
  },
};
</script>
