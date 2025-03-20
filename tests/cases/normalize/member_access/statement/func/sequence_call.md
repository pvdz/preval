# Preval test case

# sequence_call.md

> Normalize > Member access > Statement > Func > Sequence call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  ($(1), $(2)).toString;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpCompObj /*:unknown*/ = $(2);
tmpCompObj.toString;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2).toString;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
a.toString;
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
