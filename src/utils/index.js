import { v4 as uuidv4 } from "uuid";
import { isEqual } from "lodash";

export function getPropsObj(propName, propNameDefault) {
  Object.keys(propNameDefault).forEach((defKey) => {
    if (!propName[defKey])
      Object.assign(propName, { [defKey]: propNameDefault[defKey] });
  });
}
export function createRow(row, props, isChild = false) {
  const formattedRow = {};
  props.headers.forEach((head) => {
    Object.assign(formattedRow, {
      [head[props.headerOptions.value]]: row[head[props.headerOptions.value]],
    });
  });
  const obj = {
    id: uuidv4(),
    row: { ...row },
    formattedRow,
    // TODO: add check if array method
    /* TODO: check selected attribute
            be aware this selected attribute will not change after get its value to push it to the value array or not 
        */
    [props.selectOptions.label]: !props.value[isChild ? 'selectedChildren' : 'selected'].findIndex
      ? false
      : props.value[isChild ? 'selectedChildren' : 'selected'].findIndex((val) => {
          if (props.selectOptions.reduce(row) != null) {
            return isEqual(props.selectOptions.reduce(row), val);
          } else {
            return isEqual(row, val);
          }
        }) != -1,
    open: false,
  };
  return { obj, selected: obj[props.selectOptions.label] };
}
export function warnIndexNotFound(id) {
  console.warn("item with uniqueId " + id + " is not exist in the array");
}
