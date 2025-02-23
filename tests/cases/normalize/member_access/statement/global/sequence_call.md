# Preval test case

# sequence_call.md

> Normalize > Member access > Statement > Global > Sequence call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
($(1), $(2)).toString;
`````

## Pre Normal


`````js filename=intro
($(1), $(2)).toString;
`````

## Normalized


`````js filename=intro
$(1);
const tmpCompObj = $(2);
tmpCompObj.toString;
`````

## Output


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
tmpCompObj.toString;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
a.toString;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
