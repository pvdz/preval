# Preval test case

# member_complex_bin.md

> normalize > assignment > obj-spread > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({...($(a).x = b + c)});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpObjSpreadArg = tmpNestedAssignMemberRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpObjSpreadArg = tmpNestedAssignMemberRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
