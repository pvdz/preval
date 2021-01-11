# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemberObj;
var tmpArg;
var tmpComplexMemberObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemberObj = obj.a;
tmpAssignMemberObj.b = 15;
tmpComplexMemberObj = obj.a;
tmpArg = tmpComplexMemberObj.b;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = x();
x = { x: x };
var x = { x: x };
x = x.x;
x.x = 8;
x = x.x;
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemberObj;
var tmpArg;
var tmpComplexMemberObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemberObj = obj.a;
tmpAssignMemberObj.b = 15;
tmpComplexMemberObj = obj.a;
tmpArg = tmpComplexMemberObj.b;
$(tmpArg);
`````
