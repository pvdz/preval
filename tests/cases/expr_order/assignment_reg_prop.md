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
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
tmpAssignMemLhsObj = $(1);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
tmpAssignMemLhsObj = $(1);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
