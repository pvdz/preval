# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj['a']['b'];
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCompObj = obj['a'];
tmpCompObj.b;
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCompObj = obj.a;
tmpCompObj.b;
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
