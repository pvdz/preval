# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

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
let x = 10;
$(1);
$(2);
const tmpAssignRhsProp = $($);
x = tmpAssignRhsProp.length;
$(x);
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

Normalized calls: Same

Final output calls: Same
