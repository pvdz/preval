# Preval test case

# math_log_negative.md

> Math > Ai > Math log negative
>
> Math.log with negative numbers and zero

## Input

`````js filename=intro
const a = $(Math.log(-1));
const b = $(Math.log(0));
const c = $(Math.log(1));
$(a);
$(b);
$(c);
// Should be NaN, -Infinity, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const c /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $($Number_NEGATIVE_INFINITY);
const c = $(0);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NEGATIVE_INFINITY );
const c = $( 0 );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
const tmpMCF$1 = $Math_log;
let tmpCalleeParam$1 = $Number_NEGATIVE_INFINITY;
const b = $($Number_NEGATIVE_INFINITY);
const tmpMCF$3 = $Math_log;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
$(a);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: -Infinity
 - 3: 0
 - 4: NaN
 - 5: -Infinity
 - 6: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
