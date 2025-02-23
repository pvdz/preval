# Preval test case

# sequence_call_computed.md

> Normalize > Member access > Statement > Global > Sequence call computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let c = 1;
($(1), $(2))[$('toString')];
$(c);
`````

## Pre Normal


`````js filename=intro
let c = 1;
($(1), $(2))[$(`toString`)];
$(c);
`````

## Normalized


`````js filename=intro
let c = 1;
$(1);
const tmpCompObj = $(2);
const tmpCompProp = $(`toString`);
tmpCompObj[tmpCompProp];
$(c);
`````

## Output


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const tmpCompProp /*:unknown*/ = $(`toString`);
tmpCompObj[tmpCompProp];
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = $( "toString" );
a[ b ];
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
