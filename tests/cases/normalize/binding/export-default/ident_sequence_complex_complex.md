# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c)).x = $(c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
let b = 2;
let c = 3;
export let a =
  (($(b), (tmpAssignMemLhsObj = $(c))),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj), (tmpAssignMemRhs = $(c)), (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
export let a =
  (($(2), (tmpAssignMemLhsObj = $(3))),
  (((tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj), (tmpAssignMemRhs = $(3)), (tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1)),
  (tmpAssignMemLhsObj$2.x = tmpAssignMemRhs)));
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
