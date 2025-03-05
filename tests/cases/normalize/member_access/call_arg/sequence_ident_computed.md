# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Call arg > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let b = "foo";
let c = 1;
$(($(1), b)[$('length')]);
$(c);
`````

## Pre Normal


`````js filename=intro
let b = `foo`;
let c = 1;
$(($(1), b)[$(`length`)]);
$(c);
`````

## Normalized


`````js filename=intro
let b = `foo`;
let c = 1;
$(1);
const tmpCompObj = b;
const tmpCompProp = $(`length`);
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
$(c);
`````

## Output


`````js filename=intro
$(1);
const tmpCompProp /*:unknown*/ = $(`length`);
const tmpCalleeParam /*:unknown*/ = `foo`[tmpCompProp];
$(tmpCalleeParam);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
const b = "foo"[ a ];
$( b );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 3
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
