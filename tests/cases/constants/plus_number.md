# Preval test case

# plus_number.md

> Constants > Plus number
>
> Positive numbers should be treated as constants as well. But the minus is dropped either way so it should be easy.

## Input

`````js filename=intro
const x = +5;
const y = x;
$(y); // Should be inlined to -5
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 5;
const y = x;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
