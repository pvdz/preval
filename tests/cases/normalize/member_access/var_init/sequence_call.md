# Preval test case

# sequence_call.md

> Normalize > Member access > Var init > Sequence call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = ($(1), $(2)).toString;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = ($(1), $(2)).toString;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
const tmpCompObj = $(2);
let x = tmpCompObj.toString;
$(x);
`````

## Output

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const x = tmpCompObj.toString;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
