# Preval test case

# constructor.md

> Normalize > Number > Constructor
>
> The .constructor property should resolve to Number

## Input

`````js filename=intro
$(500..constructor("300"));
`````


## Settled


`````js filename=intro
$(300);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(300);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 300 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $number_constructor;
let tmpCalleeParam = $coerce(`300`, `number`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 300
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
