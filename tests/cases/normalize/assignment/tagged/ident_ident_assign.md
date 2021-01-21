# Preval test case

# ident_ident_assign.md

> normalize > assignment > tagged > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$`abc ${a = b = $(c).y = $(d)} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = $(c);
tmpNestedAssignMemberRhs = $(d);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: <crash[ Cannot set property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
