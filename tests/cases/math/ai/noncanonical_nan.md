# Preval test case

# noncanonical_nan.md

> Math > Ai > Noncanonical nan
>
> Non-canonical NaN comparison

## Input

`````js filename=intro
const nan1 = $(0/0);
const nan2 = $(Math.sqrt(-1));
$(Object.is(nan1, nan2));
// Should be true
`````


## Settled


`````js filename=intro
const nan1 /*:unknown*/ = $($Number_NaN);
const nan2 /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam$3 /*:boolean*/ = $Object_is(nan1, nan2);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const nan1 = $($Number_NaN);
$($Object_is(nan1, $($Number_NaN)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NaN );
const c = $Object_is( a, b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = NaN;
const nan1 = $($Number_NaN);
const tmpMCF = $Math_sqrt;
let tmpCalleeParam$1 = NaN;
const nan2 = $($Number_NaN);
const tmpMCF$1 = $Object_is;
let tmpCalleeParam$3 = $Object_is(nan1, nan2);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_is


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
