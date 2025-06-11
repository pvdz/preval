# Preval test case

# float64_to_int32_truncation.md

> Math > Ai > Float64 to int32 truncation
>
> Float64 to Int32 truncation

## Input

`````js filename=intro
const a = $(4294967297); // 2^32 + 1
const b = a | 0;
$(b);
// Should be 1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(4294967297);
const b /*:number*/ /*|0*/ = a | 0;
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(4294967297) | 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 4294967297 );
const b = a | 0;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(4294967297);
const b = a | 0;
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4294967297
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
