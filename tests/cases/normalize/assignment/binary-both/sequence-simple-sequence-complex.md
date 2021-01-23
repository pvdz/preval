# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > binary-both > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, b).c = (a, $(b)).c = d) + ((a, b).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedAssignMemberObj = tmpNestedAssignObj;
a;
tmpNestedAssignObj$1 = $(b);
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
a;
tmpNestedAssignObj$2 = b;
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$2;
a;
tmpNestedAssignObj$3 = $(b);
tmpNestedPropAssignRhs$1 = d;
tmpNestedAssignObj$3.c = tmpNestedPropAssignRhs$1;
tmpNestedAssignMemberRhs$1 = tmpNestedPropAssignRhs$1;
tmpNestedAssignMemberObj$1.c = tmpNestedAssignMemberRhs$1;
tmpBinaryRight = tmpNestedAssignMemberRhs$1;
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
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs$1;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryLeft = tmpNestedAssignMemberRhs;
tmpNestedAssignObj$2 = b;
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$2;
tmpNestedAssignObj$3 = $(b);
tmpNestedPropAssignRhs$1 = 3;
tmpNestedAssignObj$3.c = tmpNestedPropAssignRhs$1;
tmpNestedAssignMemberRhs$1 = tmpNestedPropAssignRhs$1;
tmpNestedAssignMemberObj$1.c = tmpNestedAssignMemberRhs$1;
tmpBinaryRight = tmpNestedAssignMemberRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: 6
 - 3: 1,{"c":3},"unused",3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
