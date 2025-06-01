# Preval test case

# ai_rule318_iife_returns_opaque_func_called.md

> Ai > Ai4 > Ai rule318 iife returns opaque func called
>
> Test: IIFE returning an opaque function, which is then immediately called.

## Input

`````js filename=intro
// Expected: $('iife_run'); $('opaque_func_id')(); $('after_call');
$('iife_run');
(function(){
  return $('opaque_func_id');
})()();
$('after_call');
`````


## Settled


`````js filename=intro
$(`iife_run`);
const tmpCallComplexCallee /*:unknown*/ = $(`opaque_func_id`);
tmpCallComplexCallee();
$(`after_call`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`iife_run`);
const tmpCallComplexCallee = $(`opaque_func_id`);
tmpCallComplexCallee();
$(`after_call`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "iife_run" );
const a = $( "opaque_func_id" );
a();
$( "after_call" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`iife_run`);
const tmpCallComplexCallee$1 = function () {
  debugger;
  const tmpReturnArg = $(`opaque_func_id`);
  return tmpReturnArg;
};
const tmpCallComplexCallee = tmpCallComplexCallee$1();
tmpCallComplexCallee();
$(`after_call`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'iife_run'
 - 2: 'opaque_func_id'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
