# Preval test case

# early_return_without_elim2.md

> Ifelse > Label > Early return without elim2
>
> Early return in labeled if-else such that it won't just be eliminated through DCE

Regression; The function was inlined into global but the return statement was not scrubbed.

## Input

`````js filename=intro
let f = function () {
  const g = function () {
    if ($) {
      return undefined;
    } else {
      return undefined;
    }
  };
  $('inside');
  const t = g();
  return t;
};
f();
`````


## Settled


`````js filename=intro
$(`inside`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inside`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inside" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inside'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
