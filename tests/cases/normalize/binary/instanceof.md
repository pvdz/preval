# Preval test case

# instanceof.md

> Normalize > Binary > Instanceof
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 instanceof Infinity);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:boolean*/ = 5 instanceof $Number_POSITIVE_INFINITY;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5 instanceof $Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 5 instanceof $Number_POSITIVE_INFINITY;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 5 instanceof Infinity;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
