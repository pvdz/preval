# Preval test case

# computed_prop.md

> expr_order > computed_prop
>
> Object evals before rhs

#TODO

## Input

`````js filename=intro
$(1).x = $(2);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
tmpAssignMemLhsObj = $(1);
tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
tmpAssignMemLhsObj = $(1);
tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````
