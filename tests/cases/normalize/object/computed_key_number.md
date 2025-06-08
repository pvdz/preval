# Preval test case

# computed_key_number.md

> Normalize > Object > Computed key number
>
> Computed key that is a number value might as well not be computed

## Input

`````js filename=intro
$({[100]: 10});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [100]: 10 };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [100]: 10 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 100 ]: 10 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [100]: 10 };
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 100: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
