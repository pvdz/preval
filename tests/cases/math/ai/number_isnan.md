# Preval test case

# number_isnan.md

> Math > Ai > Number isnan
>
> Number.isNaN with NaN and non-NaN values

## Input

`````js filename=intro
const a = $(NaN);
const b = $(0);
$(Number.isNaN(a));
$(Number.isNaN(b));
// Should be true, false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $(0);
const tmpCalleeParam /*:boolean*/ = $Number_isNaN(a);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_isNaN(b);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $(0);
$($Number_isNaN(a));
$($Number_isNaN(b));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( 0 );
const c = $Number_isNaN( a );
$( c );
const d = $Number_isNaN( b );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $($Number_NaN);
const b = $(0);
const tmpMCF = $Number_isNaN;
let tmpCalleeParam = $Number_isNaN(a);
$(tmpCalleeParam);
const tmpMCF$1 = $Number_isNaN;
let tmpCalleeParam$1 = $Number_isNaN(b);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isNaN


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: 0
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
