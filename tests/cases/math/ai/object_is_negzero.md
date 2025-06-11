# Preval test case

# object_is_negzero.md

> Math > Ai > Object is negzero
>
> Object.is distinguishes -0 and 0

## Input

`````js filename=intro
const a = $(-0);
const b = $(0);
$(Object.is(a, b));
// Should be false

// Number.isNaN with NaN and non-NaN values
const a2 = $(NaN);
const b2 = $(0);
$(Number.isNaN(a2));
$(Number.isNaN(b2));
// Should be true, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-0);
const b /*:unknown*/ = $(0);
const tmpCalleeParam /*:boolean*/ = $Object_is(a, b);
$(tmpCalleeParam);
const a2 /*:unknown*/ = $($Number_NaN);
const b2 /*:unknown*/ = $(0);
const tmpCalleeParam$1 /*:boolean*/ = $Number_isNaN(a2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = $Number_isNaN(b2);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(-0);
$($Object_is(a, $(0)));
const a2 = $($Number_NaN);
const b2 = $(0);
$($Number_isNaN(a2));
$($Number_isNaN(b2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -0 );
const b = $( 0 );
const c = $Object_is( a, b );
$( c );
const d = $( $Number_NaN );
const e = $( 0 );
const f = $Number_isNaN( d );
$( f );
const g = $Number_isNaN( e );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(-0);
const b = $(0);
const tmpMCF = $Object_is;
let tmpCalleeParam = $Object_is(a, b);
$(tmpCalleeParam);
const a2 = $($Number_NaN);
const b2 = $(0);
const tmpMCF$1 = $Number_isNaN;
let tmpCalleeParam$1 = $Number_isNaN(a2);
$(tmpCalleeParam$1);
const tmpMCF$3 = $Number_isNaN;
let tmpCalleeParam$3 = $Number_isNaN(b2);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isNaN
- (todo) type trackeed tricks can possibly support static $Object_is


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: false
 - 4: NaN
 - 5: 0
 - 6: true
 - 7: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
