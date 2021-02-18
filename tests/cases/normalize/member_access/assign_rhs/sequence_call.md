# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2)).toString;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsProp = $(2);
x = tmpAssignRhsProp.toString;
$(x);
`````

## Output

`````js filename=intro
$(1);
const tmpAssignRhsProp = $(2);
const SSA_x = tmpAssignRhsProp.toString;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
