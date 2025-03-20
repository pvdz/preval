# Preval test case

# strict.md

> Exprstmt > Strict
>
> String as statement can be eliminated, even "use strict", because we assume module goal

## Input

`````js filename=intro
"use strict";
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
