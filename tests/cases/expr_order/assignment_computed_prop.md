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
const tmpAssignComMemLhsObj = $(1);
const tmpAssignComMemLhsProp = $(2);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(3);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Output

`````js filename=intro
const tmpAssignComMemLhsObj = $(1);
const tmpAssignComMemLhsProp = $(2);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(3);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
