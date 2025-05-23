# Preval test case

# number_number_0.md

> Array > Static context > Number number 0
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([0]));
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNumberFirstArg = [0];
let tmpCalleeParam = $coerce(tmpNumberFirstArg, `number`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
