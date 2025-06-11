# Preval test case

# math_clz32_zero.md

> Math > Ai > Math clz32 zero
>
> Math.clz32 of 0

## Input

`````js filename=intro
const a = $(Math.clz32(0));
$(a);
// Should be 32
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(32);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(32));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_clz32;
let tmpCalleeParam = 32;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32
 - 2: 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
