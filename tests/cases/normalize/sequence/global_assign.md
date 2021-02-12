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
$(1);
const tmpAssignMemLhsObj = $(2);
tmpAssignMemLhsObj.x = 1;
`````

## Output

`````js filename=intro
$(1);
const tmpAssignMemLhsObj = $(2);
tmpAssignMemLhsObj.x = 1;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
