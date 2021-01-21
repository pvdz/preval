# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
export default (a, $(b)).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
export default (a, (tmpAssignMemLhsObj = $(b)), (tmpAssignMemRhs = d), tmpAssignMemLhsObj).c = tmpAssignMemRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
export default (1, (tmpAssignMemLhsObj = $(b)), (tmpAssignMemRhs = 3), tmpAssignMemLhsObj).c = tmpAssignMemRhs;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
