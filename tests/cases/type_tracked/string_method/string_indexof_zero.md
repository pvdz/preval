# Preval test case

# string_indexof_zero.md

> Type tracked > String method > String indexof zero
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf());
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_indexOf;
let tmpCalleeParam = -1;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
