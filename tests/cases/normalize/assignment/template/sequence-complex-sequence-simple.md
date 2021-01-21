# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > template > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(`abc ${(a, $(b)).c = (a, b).c = d} def`);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpArg = `abc ${((a,
(tmpAssignMemLhsObj = $(b)),
a,
(tmpNestedAssignObj = b),
(tmpNestedAssignObj.c = d),
(tmpAssignMemRhs = d),
tmpAssignMemLhsObj).c = tmpAssignMemRhs)} def`;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpArg = `abc ${((1,
(tmpAssignMemLhsObj = $(b)),
1,
(tmpNestedAssignObj = b),
(tmpNestedAssignObj.c = 3),
(tmpAssignMemRhs = 3),
tmpAssignMemLhsObj).c = tmpAssignMemRhs)} def`;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same