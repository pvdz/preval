# Preval test case

# math_round_halfway.md

> Math > Ai > Math round halfway
>
> Math.round halfway cases

## Input

`````js filename=intro
const a = $(Math.round(0.5));
const b = $(Math.round(-0.5));
$(a);
$(b);
// Should be 1 and 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(-0);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = $(-0);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( -0 );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_round;
let tmpCalleeParam = 1;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_round;
let tmpCalleeParam$1 = -0;
const b = $(tmpCalleeParam$1);
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 1
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
