# Preval test case

# sequence-simple.md

> normalize > assignment > arr-element > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$([ (a, b).c = d ]);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpElement = d;
tmpArg = [tmpElement];
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpElement = 3;
tmpArg = [tmpElement];
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[[3]], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
