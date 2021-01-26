# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
let x = obj.a.b.c;
$(x);
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
const tmpBindingInit$1 = obj.a;
const tmpBindingInit = tmpBindingInit$1.b;
let x = tmpBindingInit.c;
$(x);
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
const tmpBindingInit$1 = obj.a;
const tmpBindingInit = tmpBindingInit$1.b;
let x = tmpBindingInit.c;
$(x);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
