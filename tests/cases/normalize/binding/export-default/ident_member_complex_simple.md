# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > export-default > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = $(b).x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let b = { x: 2 };
let c = 3;
export let a = ((tmpAssignMemLhsObj = $(b)), (tmpAssignMemLhsObj.x = c));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
let b = { x: 2 };
export let a = ((tmpAssignMemLhsObj = $(b)), (tmpAssignMemLhsObj.x = 3));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
