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


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
const x /*:unknown*/ = tmpCompObj.toString;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2).toString);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = a.toString;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
