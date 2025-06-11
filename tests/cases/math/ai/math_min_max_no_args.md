# Preval test case

# math_min_max_no_args.md

> Math > Ai > Math min max no args
>
> Math.min and Math.max with no arguments

## Input

`````js filename=intro
const a = $(Math.min());
const b = $(Math.max());
$(a);
$(b);
// Should be Infinity, -Infinity
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const b /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_POSITIVE_INFINITY);
const b = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_POSITIVE_INFINITY );
const b = $( $Number_NEGATIVE_INFINITY );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_min;
let tmpCalleeParam = $Number_POSITIVE_INFINITY;
const a = $($Number_POSITIVE_INFINITY);
const tmpMCF$1 = $Math_max;
let tmpCalleeParam$1 = $Number_NEGATIVE_INFINITY;
const b = $($Number_NEGATIVE_INFINITY);
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - 2: -Infinity
 - 3: Infinity
 - 4: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
