# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > arr-spread > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$([...(a = b.x = $(c).y = $(d))]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberObj_1 = $(c);
tmpNestedAssignMemberRhs_1 = $(d);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberObj_1 = $(3);
tmpNestedAssignMemberRhs_1 = $(4);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: <crash[ Cannot set property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
