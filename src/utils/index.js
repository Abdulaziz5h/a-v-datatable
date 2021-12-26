import { v4 as uuidv4 } from "uuid";
import { isEqual } from "lodash";

export function getPropsObj(propName, propNameDefault) {
    Object.keys(propNameDefault).forEach(defKey => {
        if (!propName[defKey])
            Object.assign(propName, { [defKey]: propNameDefault[defKey] });
    });
}
export function createRow(row, props) {
    const formatedRow = {};
    props.headers.forEach(head => {
        Object.assign(formatedRow, {
            [head[props.headerOptions.value]]:
                row[head[props.headerOptions.value]]
        });
    });
    // const obj = ref({
    //     id: uuidv4(),
    //     row: { ...row },
    //     formatedRow,
    //     [props.selectOptions.label]:
    //         props.value.findIndex(val => {
    //             if (props.reduce(row) != null) {
    //                 return _.isEqual(props.reduce(row), val);
    //             } else {
    //                 return _.isEqual(row, val);
    //             }
    //         }) != -1,
    //     open: false
    // });
    // return { obj: obj.value, selected: obj.value[props.selectOptions.label] };
    const obj = {
        id: uuidv4(),
        row: { ...row },
        formatedRow,
        [props.selectOptions.label]: !props.value.findIndex
            ? false
            : props.value.findIndex(val => {
                  if (props.reduce(row) != null) {
                      return isEqual(props.reduce(row), val);
                  } else {
                      return isEqual(row, val);
                  }
              }) != -1,
        open: false
    };
    return { obj, selected: obj[props.selectOptions.label] };
}
export function warnIndexNotFound(id) {
    console.warn("item with uniqueId " + id + " is not exist in the array");
}
