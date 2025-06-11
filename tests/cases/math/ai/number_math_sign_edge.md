# Preval test case

# number_math_sign_edge.md

> Math > Ai > Number math sign edge
>
> Math.sign with positive, negative, zero, -0, and NaN

## Input

`````js filename=intro
const a = $(Math.sign(42));
const b = $(Math.sign(-42));
const c = $(Math.sign(0));
const d = $(Math.sign(-0));
const e = $(Math.sign(NaN));
$(a);
$(b);
$(c);
$(d);
$(e);
// Should be 1, -1, 0, -0, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(-1);
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
const a = $(1);
const b = $(-1);
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
const a = $( 1 );
const b = $( -1 );
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
const tmpMCF = $Math_sign;
let tmpCalleeParam = 1;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_sign;
let tmpCalleeParam$1 = -1;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_sign;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_sign;
let tmpCalleeParam$5 = -0;
const d = $(tmpCalleeParam$5);
const tmpMCF$7 = $Math_sign;
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
 - 1: 1
 - 2: -1
 - 3: 0
 - 4: 0
 - 5: NaN
 - 6: 1
 - 7: -1
 - 8: 0
 - 9: 0
 - 10: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
