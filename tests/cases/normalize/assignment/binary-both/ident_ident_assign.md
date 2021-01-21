# Preval test case

# ident_ident_assign.md

> normalize > assignment > binary-both > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$((a = b = $(c).y = $(d)) + (a = b = $(c).y = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedAssignMemberObj = $(c);
tmpNestedAssignMemberRhs = $(d);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignMemberObj_1 = $(c);
tmpNestedAssignMemberRhs_1 = $(d);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedComplexRhs_3 = tmpNestedAssignMemberRhs_1;
b = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_2 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_2;
tmpBinaryRight = tmpNestedComplexRhs_2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs_2;
var tmpNestedComplexRhs_3;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = 2;
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignMemberObj_1 = $(3);
tmpNestedAssignMemberRhs_1 = $(4);
tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
tmpNestedComplexRhs_3 = tmpNestedAssignMemberRhs_1;
b = tmpNestedComplexRhs_3;
tmpNestedComplexRhs_2 = tmpNestedComplexRhs_3;
a = tmpNestedComplexRhs_2;
tmpBinaryRight = tmpNestedComplexRhs_2;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 3
 - 3: 4
 - 4: 8
 - 5: 4,4,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
