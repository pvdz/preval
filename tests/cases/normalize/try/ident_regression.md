# Preval test case

# ident_regression.md

> Normalize > Try > Ident regression
>
> This minimal case was causing the ident in the try to be malformed

Somehow the ident was recorded in the outer block as well as the try-block.

This turned out to be a Tenko bug regarding try-scope tracking.

## Input

`````js filename=intro
{
  let AAAAAAAAAAAAAAAAAAAA;
  try {
    AAAAAAAAAAAAAAAAAAAA = false;
  } catch {
    AAAAAAAAAAAAAAAAAAAA = false;
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
