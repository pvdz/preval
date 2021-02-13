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
const tmpAssignMemLhsObj = $(1);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
const tmpAssignMemLhsObj = $(1);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
