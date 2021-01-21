# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > binary-both > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = $(b).x = c + d) + (a = $(b).x = c + d));
$(a, b, c);
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
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = c + d;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignMemberRhs_1 = c + d;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = 11;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignMemberRhs_1 = 11;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs_1;
a = tmpNestedComplexRhs_1;
tmpBinaryRight = tmpNestedComplexRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: {"x":7}
 - 2: 14
 - 3: 7,{"x":7},3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 11 }], [{ x: 11 }], [22], [11, { x: 11 }, 11], null];

