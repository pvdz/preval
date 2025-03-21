# Preval test case

# sequence_call_computed.md

> Normalize > Member access > Assign rhs > Sequence call computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2))[$('toString')];
$(x);
$(c);
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignRhsCompObj /*:unknown*/ = $(2);
const tmpAssignRhsCompProp /*:unknown*/ = $(`toString`);
const x /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignRhsCompObj = $(2);
const tmpAssignRhsCompProp = $(`toString`);
$(tmpAssignRhsCompObj[tmpAssignRhsCompProp]);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = $( "toString" );
const d = a[ b ];
$( d );
$( c );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
