# Preval test case

# ai_iife_unused_return_internal_calls.md

> Ai > Ai1 > Ai iife unused return internal calls
>
> Test: IIFE with internal $() calls, where IIFE's own $() return value is unused.

## Input

`````js filename=intro
// Expected: $("setup"); $("retval_is_called_but_value_unused"); $("after_iife");
(function() {
  $("setup");
  return $("retval_is_called_but_value_unused");
})();
$("after_iife");
`````


## Settled


`````js filename=intro
$(`setup`);
$(`retval_is_called_but_value_unused`);
$(`after_iife`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`setup`);
$(`retval_is_called_but_value_unused`);
$(`after_iife`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "setup" );
$( "retval_is_called_but_value_unused" );
$( "after_iife" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  $(`setup`);
  const tmpReturnArg = $(`retval_is_called_but_value_unused`);
  return tmpReturnArg;
};
tmpCallComplexCallee();
$(`after_iife`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'setup'
 - 2: 'retval_is_called_but_value_unused'
 - 3: 'after_iife'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
