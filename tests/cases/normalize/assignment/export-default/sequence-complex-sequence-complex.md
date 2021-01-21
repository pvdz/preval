# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > export-default > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
export default (a, $(b)).c = (a, $(b)).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
export default (a,
(tmpAssignMemLhsObj = $(b)),
(tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj),
a,
(tmpNestedAssignObj = $(b)),
(tmpNestedPropAssignRhs = d),
(tmpNestedAssignObj.c = tmpNestedPropAssignRhs),
(tmpAssignMemRhs = tmpNestedPropAssignRhs),
(tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1),
(tmpAssignMemLhsObj_2.c = tmpAssignMemRhs));
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
export default (1,
(tmpAssignMemLhsObj = $(b)),
(tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj),
1,
(tmpNestedAssignObj = $(b)),
(tmpNestedPropAssignRhs = 3),
(tmpNestedAssignObj.c = tmpNestedPropAssignRhs),
(tmpAssignMemRhs = tmpNestedPropAssignRhs),
(tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1),
(tmpAssignMemLhsObj_2.c = tmpAssignMemRhs));
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
