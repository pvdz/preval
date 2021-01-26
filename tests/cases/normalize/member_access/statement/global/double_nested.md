# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
obj.a.b.c;
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = $();
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpBindingInit = obj.a;
const tmpCompObj = tmpBindingInit.b;
tmpCompObj.c;
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = $();
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpBindingInit = obj.a;
const tmpCompObj = tmpBindingInit.b;
tmpCompObj.c;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
