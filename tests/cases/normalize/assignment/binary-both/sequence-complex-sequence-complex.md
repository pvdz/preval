# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > binary-both > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, $(b)).c = (a, $(b)).c = d) + ((a, $(b)).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_1;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignMemberObj = $(b);
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
a;
tmpNestedAssignMemberObj_1 = $(b);
a;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignObj_1.c = d;
tmpNestedAssignMemberRhs_1 = d;
tmpNestedAssignMemberObj_1.c = tmpNestedAssignMemberRhs_1;
tmpBinaryRight = tmpNestedAssignMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_1;
let b = { c: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
tmpNestedAssignMemberObj_1 = $(b);
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignObj_1.c = 3;
tmpNestedAssignMemberRhs_1 = 3;
tmpNestedAssignMemberObj_1.c = tmpNestedAssignMemberRhs_1;
tmpBinaryRight = tmpNestedAssignMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[{ c: 2 }], [{ c: 2 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
