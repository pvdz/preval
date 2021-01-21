# Preval test case

# sequence-simple.md

> normalize > assignment > binary-right > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(500 + ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpBinaryRight = d;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpBinaryRight = 3;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: 503
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
