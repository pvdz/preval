# Preval test case

# math_sqrt_negative_zero.md

> Math > Ai > Math sqrt negative zero
>
> Math.sqrt with negative zero and negative numbers

## Input

`````js filename=intro
const a = $(Math.sqrt(-0));
const b = $(Math.sqrt(-1));
const c = $(Math.sqrt(0));
$(a);
$(b);
$(c);
// Should be -0, NaN, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-0);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(-0);
const b = $($Number_NaN);
const c = $(0);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -0 );
const b = $( $Number_NaN );
const c = $( 0 );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sqrt;
let tmpCalleeParam = -0;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_sqrt;
let tmpCalleeParam$1 = NaN;
const b = $($Number_NaN);
const tmpMCF$3 = $Math_sqrt;
let tmpCalleeParam$3 = 0;
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
 - 2: NaN
 - 3: 0
 - 4: 0
 - 5: NaN
 - 6: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
