# Preval test case

# init_assign_both_simple.md

> Normalize > Binding > Init assign both simple
>
> Should normalize assignment init to separate line

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b = c
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
