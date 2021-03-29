# Preval test case

# group_call.md

> Normalize > Member access > Assign rhs > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2), $($)).length;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 10;
x = ($(1), $(2), $($)).length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
$(2);
const tmpAssignRhsProp = $($);
x = tmpAssignRhsProp.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpAssignRhsProp = $($);
const tmpSSA_x = tmpAssignRhsProp.length;
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
