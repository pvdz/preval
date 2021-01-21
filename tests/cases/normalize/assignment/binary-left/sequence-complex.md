# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, $(b)).c = d) + 500);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = d;
tmpBinaryLeft = d;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpBinaryLeft = 3;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
