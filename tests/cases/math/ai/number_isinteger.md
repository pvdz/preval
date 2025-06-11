# Preval test case

# number_isinteger.md

> Math > Ai > Number isinteger
>
> Number.isInteger with integer and non-integer values

## Input

`````js filename=intro
const a = $(42);
const b = $(42.1);
const c = $(NaN);
const d = $(Infinity);
$(Number.isInteger(a));
$(Number.isInteger(b));
$(Number.isInteger(c));
$(Number.isInteger(d));
// Should be true, false, false, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(42);
const b /*:unknown*/ = $(42.1);
const c /*:unknown*/ = $($Number_NaN);
const d /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const tmpCalleeParam /*:boolean*/ = $Number_isInteger(a);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_isInteger(b);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = $Number_isInteger(c);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = $Number_isInteger(d);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(42);
const b = $(42.1);
const c = $($Number_NaN);
const d = $($Number_POSITIVE_INFINITY);
$($Number_isInteger(a));
$($Number_isInteger(b));
$($Number_isInteger(c));
$($Number_isInteger(d));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = $( 42.1 );
const c = $( $Number_NaN );
const d = $( $Number_POSITIVE_INFINITY );
const e = $Number_isInteger( a );
$( e );
const f = $Number_isInteger( b );
$( f );
const g = $Number_isInteger( c );
$( g );
const h = $Number_isInteger( d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(42);
const b = $(42.1);
const c = $($Number_NaN);
const d = $($Number_POSITIVE_INFINITY);
const tmpMCF = $Number_isInteger;
let tmpCalleeParam = $Number_isInteger(a);
$(tmpCalleeParam);
const tmpMCF$1 = $Number_isInteger;
let tmpCalleeParam$1 = $Number_isInteger(b);
$(tmpCalleeParam$1);
const tmpMCF$3 = $Number_isInteger;
let tmpCalleeParam$3 = $Number_isInteger(c);
$(tmpCalleeParam$3);
const tmpMCF$5 = $Number_isInteger;
let tmpCalleeParam$5 = $Number_isInteger(d);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isInteger


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: 42.1
 - 3: NaN
 - 4: Infinity
 - 5: true
 - 6: false
 - 7: false
 - 8: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
