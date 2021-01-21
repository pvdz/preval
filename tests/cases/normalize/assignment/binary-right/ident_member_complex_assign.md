# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > binary-right > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(500 + ($(500 + (a = $(b).x = $(c).y = $(d)))));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = $(c);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignMemberRhs_1 = $(d);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpArg_1;
var tmpBinaryRight_1;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = $(3);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignMemberRhs_1 = $(4);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryRight_1 = tmpNestedComplexRhs;
tmpArg_1 = 500 + tmpBinaryRight_1;
tmpBinaryRight = $(tmpArg_1);
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: 504
 - 4: 1004
 - 5: 4,{"x":4},3,4
 - 6: undefined

Normalized calls: Same

Final output calls: Same
