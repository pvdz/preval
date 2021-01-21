# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > binary-both > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b).x = $(c).y = $(d)) + (a = $(b).x = $(c).y = $(d)));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignObj_3;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
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
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_2 = $(b);
tmpNestedAssignMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignObj_3 = $(c);
tmpNestedAssignMemberObj_3 = tmpNestedAssignObj_3;
tmpNestedAssignMemberRhs_3 = $(d);
tmpNestedAssignMemberObj_3.y = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs_2;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignObj_3;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
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
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_2 = $(b);
tmpNestedAssignMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignObj_3 = $(3);
tmpNestedAssignMemberObj_3 = tmpNestedAssignObj_3;
tmpNestedAssignMemberRhs_3 = $(4);
tmpNestedAssignMemberObj_3.y = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs_2;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: {"x":4}
 - 4: 3
 - 5: 4
 - 6: 8
 - 7: 4,{"x":4},3,4
 - 8: undefined

Normalized calls: Same

Final output calls: Same
