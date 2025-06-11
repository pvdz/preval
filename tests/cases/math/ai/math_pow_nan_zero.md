# Preval test case

# math_pow_nan_zero.md

> Math > Ai > Math pow nan zero
>
> Math.pow with NaN and zero as base or exponent

## Input

`````js filename=intro
const a = $(Math.pow(NaN, 0));
const b = $(Math.pow(0, NaN));
const c = $(Math.pow(NaN, 1));
const d = $(Math.pow(1, NaN));
$(a);
$(b);
$(c);
$(d);
// Should be 1, 0, NaN, 1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $($Number_NaN);
const d /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = $($Number_NaN);
const c = $($Number_NaN);
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( $Number_NaN );
const c = $( $Number_NaN );
const d = $( $Number_NaN );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 1;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_pow;
let tmpCalleeParam$1 = NaN;
const b = $($Number_NaN);
const tmpMCF$3 = $Math_pow;
let tmpCalleeParam$3 = NaN;
const c = $($Number_NaN);
const tmpMCF$5 = $Math_pow;
let tmpCalleeParam$5 = NaN;
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - 4: NaN
 - 5: 1
 - 6: NaN
 - 7: NaN
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
