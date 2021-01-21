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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
{
  tmpAssignComputedObj = $(1);
  tmpAssignComputedProp = $(2);
  tmpAssignComputedRhs = $(3);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
tmpAssignComputedObj = $(1);
tmpAssignComputedProp = $(2);
tmpAssignComputedRhs = $(3);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
