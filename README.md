# a-v-datatable
I found more app new huge work table so I decide to build lib with vue.js

```html
<template>
  <a-v-datatable :headers="headers" :items="items">
  </a-v-datatable>
</template>

<script>
import vueDatatable from "./a-v-datatable/a-v-datatable";
export default {
    components: {
        vueDatatable
    },
    data: () => ({
        headers: [
          {
                label: "first name",
                value: "first_name"
            },
            {
                label: "last name",
                value: "last_name"
            },
            {
                label: "email",
                value: "email"
            },
            {
                label: "gender",
                value: "gender"
            }
        ],
        items: [
          {
                id: 1,
                first_name: "Cthrine",
                last_name: "Jilkes",
                email: "cjilkes0@mapy.cz",
                gender: "Female",
          },
          {
              id: 2,
              first_name: "Darcee",
              last_name: "Headly",
              email: "dheadly1@usatoday.com",
              gender: "Male",
          },
          {
              id: 3,
              first_name: "Cynthea",
              last_name: "Siveyer",
              email: "csiveyer2@wufoo.com",
              gender: "Male",
          },
        ]
    })
};
</script>

```
