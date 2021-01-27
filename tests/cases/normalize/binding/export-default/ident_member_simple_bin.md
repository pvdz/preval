# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > export-default > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b.x = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let b = { x: 2 };
let c = 3;
let d = 4;
export let a =
  (((tmpAssignMemLhsObj = b), (tmpAssignMemRhs = c + d), (tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj)),
  (tmpAssignMemLhsObj$1.x = tmpAssignMemRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
let b = { x: 2 };
export let a =
  (((tmpAssignMemLhsObj = b), (tmpAssignMemRhs = 7), (tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj)),
  (tmpAssignMemLhsObj$1.x = tmpAssignMemRhs));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
