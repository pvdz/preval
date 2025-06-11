# Preval test case

# number_isfinite.md

> Math > Ai > Number isfinite
>
> Number.isFinite with finite and infinite values

## Input

`````js filename=intro
const a = $(42);
const b = $(Infinity);
const c = $(-Infinity);
const d = $(NaN);
$(Number.isFinite(a));
$(Number.isFinite(b));
$(Number.isFinite(c));
$(Number.isFinite(d));
// Should be true, false, false, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(42);
const b /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const c /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const d /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam /*:boolean*/ = $Number_isFinite(a);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_isFinite(b);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = $Number_isFinite(c);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = $Number_isFinite(d);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(42);
const b = $($Number_POSITIVE_INFINITY);
const c = $($Number_NEGATIVE_INFINITY);
const d = $($Number_NaN);
$($Number_isFinite(a));
$($Number_isFinite(b));
$($Number_isFinite(c));
$($Number_isFinite(d));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = $( $Number_POSITIVE_INFINITY );
const c = $( $Number_NEGATIVE_INFINITY );
const d = $( $Number_NaN );
const e = $Number_isFinite( a );
$( e );
const f = $Number_isFinite( b );
$( f );
const g = $Number_isFinite( c );
$( g );
const h = $Number_isFinite( d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(42);
const b = $($Number_POSITIVE_INFINITY);
const c = $(-Infinity);
const d = $($Number_NaN);
const tmpMCF = $Number_isFinite;
let tmpCalleeParam = $Number_isFinite(a);
$(tmpCalleeParam);
const tmpMCF$1 = $Number_isFinite;
let tmpCalleeParam$1 = $Number_isFinite(b);
$(tmpCalleeParam$1);
const tmpMCF$3 = $Number_isFinite;
let tmpCalleeParam$3 = $Number_isFinite(c);
$(tmpCalleeParam$3);
const tmpMCF$5 = $Number_isFinite;
let tmpCalleeParam$5 = $Number_isFinite(d);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isFinite


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: Infinity
 - 3: -Infinity
 - 4: NaN
 - 5: true
 - 6: false
 - 7: false
 - 8: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
