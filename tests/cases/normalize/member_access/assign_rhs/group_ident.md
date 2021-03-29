# Preval test case

# group_ident.md

> Normalize > Member access > Assign rhs > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
let x = 10;
x = ($(1), $).length;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 10;
x = ($(1), $).length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsProp = $;
x = tmpAssignRhsProp.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
const tmpSSA_x = $.length;
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
