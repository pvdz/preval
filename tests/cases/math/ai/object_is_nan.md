# Preval test case

# object_is_nan.md

> Math > Ai > Object is nan
>
> Object.is treats all NaN as equal

## Input

`````js filename=intro
const a = $(NaN);
const b = $(0/0);
$(Object.is(a, b));
// Should be true

// Number.isFinite with finite and infinite values
const a2 = $(42);
const b2 = $(Infinity);
const c = $(-Infinity);
const d = $(NaN);
$(Number.isFinite(a2));
$(Number.isFinite(b2));
$(Number.isFinite(c));
$(Number.isFinite(d));
// Should be true, false, false, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam$1 /*:boolean*/ = $Object_is(a, b);
$(tmpCalleeParam$1);
const a2 /*:unknown*/ = $(42);
const b2 /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const c /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const d /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam$3 /*:boolean*/ = $Number_isFinite(a2);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = $Number_isFinite(b2);
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:boolean*/ = $Number_isFinite(c);
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = $Number_isFinite(d);
$(tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
$($Object_is(a, $($Number_NaN)));
const a2 = $(42);
const b2 = $($Number_POSITIVE_INFINITY);
const c = $($Number_NEGATIVE_INFINITY);
const d = $($Number_NaN);
$($Number_isFinite(a2));
$($Number_isFinite(b2));
$($Number_isFinite(c));
$($Number_isFinite(d));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NaN );
const c = $Object_is( a, b );
$( c );
const d = $( 42 );
const e = $( $Number_POSITIVE_INFINITY );
const f = $( $Number_NEGATIVE_INFINITY );
const g = $( $Number_NaN );
const h = $Number_isFinite( d );
$( h );
const i = $Number_isFinite( e );
$( i );
const j = $Number_isFinite( f );
$( j );
const k = $Number_isFinite( g );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $($Number_NaN);
let tmpCalleeParam = NaN;
const b = $($Number_NaN);
const tmpMCF = $Object_is;
let tmpCalleeParam$1 = $Object_is(a, b);
$(tmpCalleeParam$1);
const a2 = $(42);
const b2 = $($Number_POSITIVE_INFINITY);
const c = $(-Infinity);
const d = $($Number_NaN);
const tmpMCF$1 = $Number_isFinite;
let tmpCalleeParam$3 = $Number_isFinite(a2);
$(tmpCalleeParam$3);
const tmpMCF$3 = $Number_isFinite;
let tmpCalleeParam$5 = $Number_isFinite(b2);
$(tmpCalleeParam$5);
const tmpMCF$5 = $Number_isFinite;
let tmpCalleeParam$7 = $Number_isFinite(c);
$(tmpCalleeParam$7);
const tmpMCF$7 = $Number_isFinite;
let tmpCalleeParam$9 = $Number_isFinite(d);
$(tmpCalleeParam$9);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isFinite
- (todo) type trackeed tricks can possibly support static $Object_is


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: true
 - 4: 42
 - 5: Infinity
 - 6: -Infinity
 - 7: NaN
 - 8: true
 - 9: false
 - 10: false
 - 11: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
