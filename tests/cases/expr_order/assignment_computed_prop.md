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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj = $(1);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $(2);
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = $(3);
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj = $(1);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $(2);
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = $(3);
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
