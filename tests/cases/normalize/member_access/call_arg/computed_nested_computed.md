# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj['a']['b']);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCallCallee = $;
const tmpBindingInit = obj['a'];
const tmpCalleeParam = tmpBindingInit['b'];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCallCallee = $;
const tmpBindingInit = obj.a;
const tmpCalleeParam = tmpBindingInit.b;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
