# a-v-datatable
## What is a-v-datatable?
a-v datatable is a vue component built with [Vue](https://vuejs.org/) to make work with tables easer and faster.
### [Demo](https://abdulaziz5h.github.io/a-v-datatable-docs/#/documentation/examples/basic)

## Why a-v-datatable?
When you work with tables, You may want to add options to your table (Add, Update or Delete) or you may want to add collapsible table or what ever. So, You will not create your table from the beginning. [a-v-datatable](https://github.com/Abdulaziz5h/a-v-datatable) gives you ability to change cells or rows and full control on your data.

### Follow the [Documentation](https://abdulaziz5h.github.io/a-v-datatable-docs/#/)

## Getting started
```bash
$ npm i a-v-datatable
```
### Global implementation
```js
import aVDatatable from "a-v-datatable"
import "a-v-datatable/dist/a-v-datatable.css"

Vue.use(aVDatatable)
```
### Global implementation
```vue
<script>
import { aVDatatable } from "a-v-datatable"
import "a-v-datatable/dist/a-v-datatable.css"

export default {
  components: {
    aVDatatable
  }
}
</script>
```

## Basic usage

```vue
<template>
    <a-v-datatable
        :headers="headers"
        :items="users"
        classes="borderd cell-borderd striped"
    />
</template>
<script>
  ...
  export default {
    ...
    data: () => ({
      headers: [
        {
          label: "name",
          value: "name"
        },
        {
          label: "username",
          value: "username"
        },
        {
          label: "E-mail",
          value: "email"
        },
        {
          label: "phone number",
          value: "phone"
        }
      ],
      users: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          phone: "1-770-736-8031 x56442",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
          phone: "010-692-6593 x09125",
        },
        ...
      ],
    })
  }
</script>
```
