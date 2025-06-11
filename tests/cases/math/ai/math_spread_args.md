# Preval test case

# math_spread_args.md

> Math > Ai > Math spread args
>
> Math.max with spread arguments from array

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
const max = $(Math.max(...arr));
$(max);
// Should be 4
`````


## Settled


`````js filename=intro
const max /*:unknown*/ = $(4);
$(max);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 4 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4];
const tmpMCF = $Math_max;
let tmpCalleeParam = $Math_max(...arr);
const max = $(tmpCalleeParam);
$(max);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
