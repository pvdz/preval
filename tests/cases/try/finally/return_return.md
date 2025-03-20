# Preval test case

# return_return.md

> Try > Finally > Return return
>
>

## Input

`````js filename=intro
function f(){
  try {
    return 1;
  } finally {
    return 2;
  }
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
