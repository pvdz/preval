# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Statement > Global > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let c = 1, b = "foo";
($(1), b)[$('length')];
$(c);
`````

## Settled


`````js filename=intro
$(1);
const tmpCompProp /*:unknown*/ = $(`length`);
`foo`[tmpCompProp];
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCompProp = $(`length`);
`foo`[tmpCompProp];
$(1);
`````

## Pre Normal


`````js filename=intro
let c = 1,
  b = `foo`;
($(1), b)[$(`length`)];
$(c);
`````

## Normalized


`````js filename=intro
let c = 1;
let b = `foo`;
$(1);
const tmpCompObj = b;
const tmpCompProp = $(`length`);
tmpCompObj[tmpCompProp];
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
"foo"[ a ];
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
