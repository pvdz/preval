# Preval test case

# sequence_call_computed.md

> Normalize > Member access > Call arg > Sequence call computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
$(($(1), $(2))[$('toString')]);
$(c);
`````


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:unknown*/ = $(`toString`);
const tmpCalleeParam /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
$(tmpCalleeParam);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpCalleeParam$1 = $(`toString`);
$(tmpCompObj[tmpCalleeParam$1]);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpCalleeParam$1 = $(`toString`);
let tmpCalleeParam = tmpCompObj[tmpCalleeParam$1];
$(tmpCalleeParam);
$(c);
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
