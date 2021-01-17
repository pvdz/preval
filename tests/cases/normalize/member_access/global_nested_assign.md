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
var tmpMemberComplexObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemberObj = obj.a;
tmpAssignMemberObj.b = 15;
tmpMemberComplexObj = obj.a;
tmpArg = tmpMemberComplexObj.b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemberObj;
var tmpArg;
var tmpMemberComplexObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemberObj = obj.a;
tmpAssignMemberObj.b = 15;
tmpMemberComplexObj = obj.a;
tmpArg = tmpMemberComplexObj.b;
$(tmpArg);
`````
