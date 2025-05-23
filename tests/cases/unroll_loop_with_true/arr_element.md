# Preval test case

# arr_element.md

> Unroll loop with true > Arr element
>
>

## Input

`````js filename=intro
const x = [1, $LOOP_DONE_UNROLLING_ALWAYS_TRUE, 3];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [1, true, 3];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, true, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, true, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [1, true, 3];
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, true, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
