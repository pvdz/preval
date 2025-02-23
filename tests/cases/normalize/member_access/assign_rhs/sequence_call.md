# Preval test case

# sequence_call.md

> Normalize > Member access > Assign rhs > Sequence call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2)).toString;
$(x);
`````

## Pre Normal


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
const tmpAssignRhsProp /*:unknown*/ = $(2);
const x /*:unknown*/ = tmpAssignRhsProp.toString;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = a.toString;
$( b );
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
