# Preval test case

# sequence-simple.md

> normalize > assignment > binary-both > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, b).c = d) + ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
a;
tmpNestedAssignObj_1 = b;
tmpNestedPropAssignRhs_1 = d;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
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
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpBinaryLeft = tmpNestedPropAssignRhs;
tmpNestedAssignObj_1 = b;
tmpNestedPropAssignRhs_1 = 3;
tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs_1;
tmpBinaryRight = tmpNestedPropAssignRhs_1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 6
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
