# Preval test case

# number_issafeinteger.md

> Math > Ai > Number issafeinteger
>
> Number.isSafeInteger with safe and unsafe integers

## Input

`````js filename=intro
const a = $(9007199254740991);
const b = $(9007199254740992);
const c = $(-9007199254740991);
const d = $(NaN);
$(Number.isSafeInteger(a));
$(Number.isSafeInteger(b));
$(Number.isSafeInteger(c));
$(Number.isSafeInteger(d));
// Should be true, false, true, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(9007199254740991);
const b /*:unknown*/ = $(9007199254740992);
const c /*:unknown*/ = $(-9007199254740991);
const d /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam /*:boolean*/ = $Number_isSafeInteger(a);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_isSafeInteger(b);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = $Number_isSafeInteger(c);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = $Number_isSafeInteger(d);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(9007199254740991);
const b = $(9007199254740992);
const c = $(-9007199254740991);
const d = $($Number_NaN);
$($Number_isSafeInteger(a));
$($Number_isSafeInteger(b));
$($Number_isSafeInteger(c));
$($Number_isSafeInteger(d));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 9007199254740991 );
const b = $( 9007199254740992 );
const c = $( -9007199254740991 );
const d = $( $Number_NaN );
const e = $Number_isSafeInteger( a );
$( e );
const f = $Number_isSafeInteger( b );
$( f );
const g = $Number_isSafeInteger( c );
$( g );
const h = $Number_isSafeInteger( d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(9007199254740991);
const b = $(9007199254740992);
const c = $(-9007199254740991);
const d = $($Number_NaN);
const tmpMCF = $Number_isSafeInteger;
let tmpCalleeParam = $Number_isSafeInteger(a);
$(tmpCalleeParam);
const tmpMCF$1 = $Number_isSafeInteger;
let tmpCalleeParam$1 = $Number_isSafeInteger(b);
$(tmpCalleeParam$1);
const tmpMCF$3 = $Number_isSafeInteger;
let tmpCalleeParam$3 = $Number_isSafeInteger(c);
$(tmpCalleeParam$3);
const tmpMCF$5 = $Number_isSafeInteger;
let tmpCalleeParam$5 = $Number_isSafeInteger(d);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isSafeInteger


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 9007199254740991
 - 2: 9007199254740992
 - 3: -9007199254740991
 - 4: NaN
 - 5: true
 - 6: false
 - 7: true
 - 8: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
