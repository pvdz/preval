# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > binary-both > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, $(b)).c = (a, $(b)).c = d) + ((a, $(b)).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_3;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
a;
tmpNestedAssignObj_1 = $(b);
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
a;
tmpNestedAssignObj_2 = $(b);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_2;
a;
tmpNestedAssignObj_3 = $(b);
tmpNestedPropAssignRhs_1 = d;
tmpNestedAssignObj_3.c = tmpNestedPropAssignRhs_1;
tmpNestedAssignMemberRhs_1 = tmpNestedPropAssignRhs_1;
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
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_3;
var tmpNestedPropAssignRhs_1;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
tmpNestedAssignObj_2 = $(b);
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_2;
tmpNestedAssignObj_3 = $(b);
tmpNestedPropAssignRhs_1 = 3;
tmpNestedAssignObj_3.c = tmpNestedPropAssignRhs_1;
tmpNestedAssignMemberRhs_1 = tmpNestedPropAssignRhs_1;
tmpNestedAssignMemberObj_1.c = tmpNestedAssignMemberRhs_1;
tmpBinaryRight = tmpNestedAssignMemberRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: {"c":3}
 - 4: 6
 - 5: 1,{"c":3},"unused",3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
