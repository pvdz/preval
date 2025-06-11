# Preval test case

# math_cbrt_edge_cases.md

> Math > Ai > Math cbrt edge cases
>
> Math.cbrt with positive, negative, zero, and NaN values

## Input

`````js filename=intro
const a = $(Math.cbrt(27));
const b = $(Math.cbrt(-27));
const c = $(Math.cbrt(0));
const d = $(Math.cbrt(-0));
const e = $(Math.cbrt(NaN));
$(a);
$(b);
$(c);
$(d);
$(e);
// Should be 3, -3, 0, -0, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(3);
const b /*:unknown*/ = $(-3);
const c /*:unknown*/ = $(0);
const d /*:unknown*/ = $(-0);
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
const a = $(3);
const b = $(-3);
const c = $(0);
const d = $(-0);
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
const a = $( 3 );
const b = $( -3 );
const c = $( 0 );
const d = $( -0 );
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
const tmpMCF = $Math_cbrt;
let tmpCalleeParam = 3;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_cbrt;
let tmpCalleeParam$1 = -3;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_cbrt;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_cbrt;
let tmpCalleeParam$5 = -0;
const d = $(tmpCalleeParam$5);
const tmpMCF$7 = $Math_cbrt;
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
 - 1: 3
 - 2: -3
 - 3: 0
 - 4: 0
 - 5: NaN
 - 6: 3
 - 7: -3
 - 8: 0
 - 9: 0
 - 10: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
