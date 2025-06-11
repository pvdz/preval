# Preval test case

# number_math_rounding.md

> Math > Ai > Number math rounding
>
> Math.round, Math.floor, Math.ceil, Math.trunc with positive and negative numbers

## Input

`````js filename=intro
const a = $(Math.round(1.5));
const b = $(Math.floor(1.5));
const c = $(Math.ceil(1.5));
const d = $(Math.trunc(1.5));
const e = $(Math.round(-1.5));
const f = $(Math.floor(-1.5));
const g = $(Math.ceil(-1.5));
const h = $(Math.trunc(-1.5));
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
$(g);
$(h);
// Should be 2, 1, 2, 1, -1, -2, -1, -1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
const b /*:unknown*/ = $(1);
const c /*:unknown*/ = $(2);
const d /*:unknown*/ = $(1);
const e /*:unknown*/ = $(-1);
const f /*:unknown*/ = $(-2);
const g /*:unknown*/ = $(-1);
const h /*:unknown*/ = $(-1);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
$(g);
$(h);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
const b = $(1);
const c = $(2);
const d = $(1);
const e = $(-1);
const f = $(-2);
const g = $(-1);
const h = $(-1);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
$(g);
$(h);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 1 );
const c = $( 2 );
const d = $( 1 );
const e = $( -1 );
const f = $( -2 );
const g = $( -1 );
const h = $( -1 );
$( a );
$( b );
$( c );
$( d );
$( e );
$( f );
$( g );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_round;
let tmpCalleeParam = 2;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_floor;
let tmpCalleeParam$1 = 1;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_ceil;
let tmpCalleeParam$3 = 2;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_trunc;
let tmpCalleeParam$5 = 1;
const d = $(tmpCalleeParam$5);
const tmpMCF$7 = $Math_round;
let tmpCalleeParam$7 = -1;
const e = $(tmpCalleeParam$7);
const tmpMCF$9 = $Math_floor;
let tmpCalleeParam$9 = -2;
const f = $(tmpCalleeParam$9);
const tmpMCF$11 = $Math_ceil;
let tmpCalleeParam$11 = -1;
const g = $(tmpCalleeParam$11);
const tmpMCF$13 = $Math_trunc;
let tmpCalleeParam$13 = -1;
const h = $(tmpCalleeParam$13);
$(a);
$(b);
$(c);
$(d);
$(e);
$(f);
$(g);
$(h);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: -1
 - 6: -2
 - 7: -1
 - 8: -1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: -1
 - 14: -2
 - 15: -1
 - 16: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
