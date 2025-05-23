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


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
tmpCompObj.toString;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2).toString;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
a.toString;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpCompObj = $(2);
tmpCompObj.toString;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
