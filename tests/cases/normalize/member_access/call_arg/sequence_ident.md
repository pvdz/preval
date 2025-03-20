# Preval test case

# sequence_ident.md

> Normalize > Member access > Call arg > Sequence ident
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let b = "foo";
$(($(1), b).length);
`````


## Settled


`````js filename=intro
$(1);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
