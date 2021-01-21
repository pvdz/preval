# Preval test case

# ident_ident_assign.md

> normalize > assignment > binary-right > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$(500 + (a = b = $(c).y = $(d)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedAssignObj = $(c);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(d);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpBinaryRight = tmpNestedComplexRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 504
 - 3: 4,4,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
