# Preval test case

# empty_block_with_catch.md

> Try > Noop > Empty block with catch
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
  } catch {
    $('fail');
  }
}
f();
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
