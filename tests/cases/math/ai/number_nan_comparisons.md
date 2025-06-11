# Preval test case

# number_nan_comparisons.md

> Math > Ai > Number nan comparisons
>
> NaN in comparisons and equality

## Input

`````js filename=intro
const a = $(NaN);
$(a == NaN);
$(a === NaN);
$(a < 1);
$(a > 1);
$(a <= 1);
$(a >= 1);
// Should all be false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
a ** 0;
$(false);
$(false);
const tmpCalleeParam$3 /*:boolean*/ = a < 1;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = a > 1;
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:boolean*/ = a <= 1;
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = a >= 1;
$(tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
a ** 0;
$(false);
$(false);
$(a < 1);
$(a > 1);
$(a <= 1);
$(a >= 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
a ** 0;
$( false );
$( false );
const b = a < 1;
$( b );
const c = a > 1;
$( c );
const d = a <= 1;
$( d );
const e = a >= 1;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $($Number_NaN);
a * 0;
let tmpCalleeParam = false;
$(tmpCalleeParam);
let tmpCalleeParam$1 = false;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = a < 1;
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = a > 1;
$(tmpCalleeParam$5);
let tmpCalleeParam$7 = a <= 1;
$(tmpCalleeParam$7);
let tmpCalleeParam$9 = a >= 1;
$(tmpCalleeParam$9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: false
 - 3: false
 - 4: false
 - 5: false
 - 6: false
 - 7: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
