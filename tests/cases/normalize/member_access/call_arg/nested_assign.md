# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b = 15);
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCallCallee = $;
tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
const tmpCalleeParam = 15;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBindingInit = obj.a;
const tmpCalleeParam$1 = tmpBindingInit.b;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
const tmpCallCallee = $;
tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
tmpCallCallee(15);
const tmpCallCallee$1 = $;
const tmpBindingInit = obj.a;
const tmpCalleeParam$1 = tmpBindingInit.b;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 15
 - 2: 15
 - 3: undefined

Normalized calls: Same

Final output calls: Same
