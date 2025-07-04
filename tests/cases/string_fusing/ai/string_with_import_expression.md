# Preval test case

# string_with_import_expression.md

> String fusing > Ai > String with import expression
>
> Test string concatenation with import expressions

For when we start to support this..?

## Input

`````js filename=intro
// const result = "module: " + import.meta.url;
// $(result);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
