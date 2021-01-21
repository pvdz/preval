# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > binary-right > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(500 + ((a, $(b)).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignMemberObj = $(b);
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryRight = tmpNestedAssignMemberRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignMemberObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpBinaryRight = tmpNestedAssignMemberRhs;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: {"c":2}
 - 2: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
