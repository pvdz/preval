# Preval test case

# number_numbers.md

> Array > Static context > Number numbers
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
$(Number([1, 2, 3]));
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = [1, 2, 3];
let tmpCalleeParam = $coerce(tmpCalleeParam$1, `number`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
