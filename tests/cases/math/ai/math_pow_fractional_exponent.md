# Preval test case

# math_pow_fractional_exponent.md

> Math > Ai > Math pow fractional exponent
>
> Math.pow with fractional exponents and negatives

## Input

`````js filename=intro
const a = $(Math.pow(4, 0.5));
const b = $(Math.pow(-8, 1/3));
const c = $(Math.pow(-1, 0.5));
$(a);
$(b);
$(c);
// Should be 2, -2, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
const b = $($Number_NaN);
const c = $($Number_NaN);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( $Number_NaN );
const c = $( $Number_NaN );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 2;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_pow;
const tmpMCP = 0.3333333333333333;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, Math, `pow`, -8, tmpMCP);
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_pow;
let tmpCalleeParam$3 = NaN;
const c = $($Number_NaN);
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
 - 1: 2
 - 2: NaN
 - 3: NaN
 - 4: 2
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
