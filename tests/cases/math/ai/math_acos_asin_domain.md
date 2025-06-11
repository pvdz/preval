# Preval test case

# math_acos_asin_domain.md

> Math > Ai > Math acos asin domain
>
> Math.acos and Math.asin with out-of-domain values

## Input

`````js filename=intro
const a = $(Math.acos(2));
const b = $(Math.acos(-2));
const c = $(Math.asin(2));
const d = $(Math.asin(-2));
$(a);
$(b);
$(c);
$(d);
// Should be NaN, NaN, NaN, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
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
const a = $($Number_NaN);
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
const a = $( $Number_NaN );
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
const tmpMCF = $Math_acos;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_acos;
let tmpCalleeParam$1 = NaN;
const b = $($Number_NaN);
const tmpMCF$3 = $Math_asin;
let tmpCalleeParam$3 = NaN;
const c = $($Number_NaN);
const tmpMCF$5 = $Math_asin;
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
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - 4: NaN
 - 5: NaN
 - 6: NaN
 - 7: NaN
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
