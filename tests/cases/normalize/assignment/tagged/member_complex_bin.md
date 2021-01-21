# Preval test case

# member_complex_bin.md

> normalize > assignment > tagged > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${$(a).x = b + c} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
