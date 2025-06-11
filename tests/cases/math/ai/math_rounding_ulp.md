# Preval test case

# math_rounding_ulp.md

> Math > Ai > Math rounding ulp
>
> Test rounding at ULP (unit in the last place) boundaries

## Input

`````js filename=intro
const a = $(Math.round(0.49999999999999994));
const b = $(Math.round(0.5));
const c = $(Math.round(0.5000000000000001));
$(a);
$(b);
$(c);
// Should be 0, 1, 1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(1);
const c /*:unknown*/ = $(1);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0);
const b = $(1);
const c = $(1);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( 1 );
const c = $( 1 );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_round;
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_round;
let tmpCalleeParam$1 = 1;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_round;
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
$(a);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 1
 - 4: 0
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
