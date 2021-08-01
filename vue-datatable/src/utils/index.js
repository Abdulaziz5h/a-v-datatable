export function getPropsObj(propName, propNameDefault) {
    Object.keys(propNameDefault).forEach((defKey) => {
        if(!propName[defKey]) Object.assign(propName, {[defKey]: propNameDefault[defKey]})
    })
}