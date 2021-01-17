# Preval test case

# computed_prop.md

> expr_order > computed_prop
>
> The object is evaluated before the computed property

#TODO

## Input

`````js filename=intro
$(1)[$(2)] = $(3);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
tmpAssignMemLhsObj = $(1);
tmpAssignMemRhs = $(3);
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $(2);
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
tmpAssignMemLhsObj = $(1);
tmpAssignMemRhs = $(3);
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $(2);
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
`````
