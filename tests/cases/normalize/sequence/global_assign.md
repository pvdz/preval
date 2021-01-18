# Preval test case

# end.md

> normalize > sequence > end
>
> Special case for toplevel assignments to a property of a sequence

This wouldn't occur in actual code but we will see it as an artifact of other transforms (namely, the member expression).

## Input

`````js filename=intro
($(1), $(2)).x = 1;
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
$(1);
tmpAssignMemLhsObj = $(2);
tmpAssignMemRhs = 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
$(1);
tmpAssignMemLhsObj = $(2);
tmpAssignMemRhs = 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
[[1], [2], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
