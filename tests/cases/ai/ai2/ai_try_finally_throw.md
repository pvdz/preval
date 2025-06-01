# Preval test case

# ai_try_finally_throw.md

> Ai > Ai2 > Ai try finally throw
>
> Test: try...finally (no catch) where try throws.

## Input

`````js filename=intro
// Expected: try { throw $('error'); } finally { $('finally_run'); } (or equivalent, error should propagate)
try {
  $('try_block');
  throw $('error_source');
  $('unreachable');
} finally {
  $('finally_run');
}
`````


## Settled


`````js filename=intro
let $finalArg /*:unknown*/ = undefined;
try {
  $(`try_block`);
  $finalArg = $(`error_source`);
} catch ($finalImplicit) {
  $(`finally_run`);
  throw $finalImplicit;
}
$(`finally_run`);
throw $finalArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalArg = undefined;
try {
  $(`try_block`);
  $finalArg = $(`error_source`);
} catch ($finalImplicit) {
  $(`finally_run`);
  throw $finalImplicit;
}
$(`finally_run`);
throw $finalArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  $( "try_block" );
  a = $( "error_source" );
}
catch (b) {
  $( "finally_run" );
  throw b;
}
$( "finally_run" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow = false;
let $finalStep = false;
let $finalCatchArg = undefined;
let $finalArg = undefined;
$finally: {
  try {
    $(`try_block`);
    $finalStep = true;
    $finalArg = $(`error_source`);
    break $finally;
  } catch ($finalImplicit) {
    $(`finally_run`);
    throw $finalImplicit;
  }
}
$(`finally_run`);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  throw $finalArg;
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try_block'
 - 2: 'error_source'
 - 3: 'finally_run'
 - eval returned: ('<crash[ error_source ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
