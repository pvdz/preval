# Preval test case

# and_twice_good.md

> Bit hacks > And twice good
>
> Silly case that might happen in the IR

## Input

`````js filename=intro
const x = $(100) & 32;
$(x);
const y = x & 32; // Redundant
$(y);
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(100);
const x /*:number*/ /*&32*/ /*oneBitAnded*/ = tmpBinLhs & 32;
$(x);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(100) & 32;
$(x);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a & 32;
$( b );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $(100);
const x = tmpBinLhs & 32;
$(x);
const y = x & 32;
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 32
 - 3: 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
