# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
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
const tmpCallCallee = $;
const tmpBindingInit$1 = obj.a;
const tmpBindingInit = tmpBindingInit$1.b;
const tmpCalleeParam = tmpBindingInit.c;
tmpCallCallee(tmpCalleeParam);
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
const tmpCallCallee = $;
const tmpBindingInit$1 = obj.a;
const tmpBindingInit = tmpBindingInit$1.b;
const tmpCalleeParam = tmpBindingInit.c;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
