# Preval test case

# and_twice_bad.md

> Bit hacks > And twice bad
>
> Silly case that might happen in the IR

## Input

`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 4; // Must be zero
$(y);
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(100);
const x /*:number*/ = tmpBinLhs & 32;
$(x);
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) & 32);
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a & 32;
$( b );
$( 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 32
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
