# Preval test case

# ai_unused_fn_expr_assigned_to_var.md

> Ai > Ai1 > Ai unused fn expr assigned to var
>
> Test: Unused function expression assigned to a variable that is never read.

## Input

`````js filename=intro
// Expected: $('done');
let unused_fn = function(a) {
  $('inside_unused_fn_SHOULD_NOT_RUN'); 
  return a + 1;
};
// unused_fn is not called, nor is its reference passed anywhere.
$('done');
`````


## Settled


`````js filename=intro
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let unused_fn = function ($$0) {
  let a = $$0;
  debugger;
  $(`inside_unused_fn_SHOULD_NOT_RUN`);
  const tmpReturnArg = a + 1;
  return tmpReturnArg;
};
$(`done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
