# Preval test case

# memberexpression.md

> Let hoisting > Memberexpression
>
> Member expression was causing problems

## Input

`````js filename=intro
let f = function () {
  if ($) {
    a = $;
    return undefined;
  }
};
let b = $;
let a = b.a;

`````


## Settled


`````js filename=intro
$.a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$.a;
`````


## PST Settled
With rename=true

`````js filename=intro
$.a;
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
