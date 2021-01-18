# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, $(b)).c = d) + ((a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignObj_1;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = d;
tmpBinaryLeft = d;
a;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignObj_1.c = d;
tmpBinaryRight = d;
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
var tmpNestedAssignObj_1;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpBinaryLeft = 3;
tmpNestedAssignObj_1 = $(b);
tmpNestedAssignObj_1.c = 3;
tmpBinaryRight = 3;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[{ c: 2 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
