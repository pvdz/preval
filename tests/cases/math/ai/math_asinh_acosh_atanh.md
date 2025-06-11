# Preval test case

# math_asinh_acosh_atanh.md

> Math > Ai > Math asinh acosh atanh
>
> Math.asinh, Math.acosh, Math.atanh with edge values

## Input

`````js filename=intro
const a = $(Math.asinh(0));
const b = $(Math.acosh(1));
const c = $(Math.atanh(0));
const d = $(Math.acosh(0.5));
const e = $(Math.atanh(2));
$(a);
$(b);
$(c);
$(d);
$(e);
// Should be 0, 0, 0, NaN, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(0);
const c /*:unknown*/ = $(0);
const d /*:unknown*/ = $($Number_NaN);
const e /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0);
const b = $(0);
const c = $(0);
const d = $($Number_NaN);
const e = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( 0 );
const c = $( 0 );
const d = $( $Number_NaN );
const e = $( $Number_NaN );
$( a );
$( b );
$( c );
$( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_asinh;
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_acosh;
let tmpCalleeParam$1 = 0;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_atanh;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_acosh;
let tmpCalleeParam$5 = NaN;
const d = $($Number_NaN);
const tmpMCF$7 = $Math_atanh;
let tmpCalleeParam$7 = NaN;
const e = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: NaN
 - 5: NaN
 - 6: 0
 - 7: 0
 - 8: 0
 - 9: NaN
 - 10: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
