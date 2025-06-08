# Preval test case

# computed_key_number_jard.md

> Normalize > Object > Computed key number jard
>
> Computed key that is a number value might as well not be computed but has to be converted properly

## Input

`````js filename=intro
$({[1e4]: 10}); // This will create a key 1000, not '1e4'. Luckily this shouldn't matter for the AST but dangerous if keys get normalized to strings.
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [10000]: 10 };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [10000]: 10 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 10000 ]: 10 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [10000]: 10 };
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 10000: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
