# Preval test case

# ident_call_complex_complex_args1.md

> Normalize > Expressions > Assignments > Arr element > Ident call complex complex args1
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };
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
