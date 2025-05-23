# Preval test case

# ident.md

> Normalize > Member access > Call arg > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$($.length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $.length;
$(tmpCalleeParam);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $.length;
$(tmpCalleeParam);
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
