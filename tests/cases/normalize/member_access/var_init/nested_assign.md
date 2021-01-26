# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = obj.a.b = 15;
$(x);
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
obj.a.b = 15;
let x = 15;
$(x);
const tmpCallCallee = $;
const tmpBindingInit = obj.a;
const tmpCalleeParam = tmpBindingInit.b;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
obj.a.b = 15;
$(15);
const tmpCallCallee = $;
const tmpBindingInit = obj.a;
const tmpCalleeParam = tmpBindingInit.b;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 15
 - 2: 15
 - 3: undefined

Normalized calls: Same

Final output calls: Same
