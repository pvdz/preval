# Preval test case

# math_nan_propagation.md

> Math > Ai > Math nan propagation
>
> NaN propagation through chained Math operations

## Input

`````js filename=intro
const a = $(Math.sqrt(-1));
const b = $(Math.log(a));
$(b);
// Should be NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const tmpCalleeParam$1 /*:number*/ = $Math_log(a);
const b /*:unknown*/ = $(tmpCalleeParam$1);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Math_log($($Number_NaN))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $Math_log( a );
const c = $( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sqrt;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_log;
let tmpCalleeParam$1 = $Math_log(a);
const b = $(tmpCalleeParam$1);
$(b);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_log


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
