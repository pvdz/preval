# Preval test case

# ident_member_complex_bin.md

> normalize > assignment > export-default > ident_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = $(b).x = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
let b = { x: 2 };
let c = 3;
let d = 4;
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj), (tmpAssignMemRhs = c + d), (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
let b = { x: 2 };
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj), (tmpAssignMemRhs = 7), (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
