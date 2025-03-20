# Preval test case

# var_body.md

> Normalize > Try > Finally > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} finally {
  var x;
}
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
