# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > export-default > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
export default (a, b).c = (a, b).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
export default (a,
(tmpAssignMemLhsObj = b),
a,
(tmpNestedAssignObj = b),
(tmpNestedAssignObj.c = d),
(tmpAssignMemRhs = d),
tmpAssignMemLhsObj).c = tmpAssignMemRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
export default (1,
(tmpAssignMemLhsObj = b),
1,
(tmpNestedAssignObj = b),
(tmpNestedAssignObj.c = 3),
(tmpAssignMemRhs = 3),
tmpAssignMemLhsObj).c = tmpAssignMemRhs;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same