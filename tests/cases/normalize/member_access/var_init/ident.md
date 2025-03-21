# Preval test case

# ident.md

> Normalize > Member access > Var init > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = $.length;
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $.length;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $.length;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
