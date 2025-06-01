# Preval test case

# ai_try_normal_finally.md

> Ai > Ai2 > Ai try normal finally
>
> Test: finally block should execute if try block completes normally.

## Input

`````js filename=intro
// Expected: try { $('try_block_done'); } finally { $('finally_executed'); } (or equivalent normalized form)
try {
  $('try_block_start');
  let x = $('something');
  $('try_block_done');
} finally {
  $('finally_executed');
}
`````


## Settled


`````js filename=intro
try {
  $(`try_block_start`);
  $(`something`);
  $(`try_block_done`);
} catch ($finalImplicit) {
  $(`finally_executed`);
  throw $finalImplicit;
}
$(`finally_executed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`try_block_start`);
  $(`something`);
  $(`try_block_done`);
} catch ($finalImplicit) {
  $(`finally_executed`);
  throw $finalImplicit;
}
$(`finally_executed`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "try_block_start" );
  $( "something" );
  $( "try_block_done" );
}
catch (a) {
  $( "finally_executed" );
  throw a;
}
$( "finally_executed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(`try_block_start`);
  let x = $(`something`);
  $(`try_block_done`);
} catch ($finalImplicit) {
  $(`finally_executed`);
  throw $finalImplicit;
}
$(`finally_executed`);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try_block_start'
 - 2: 'something'
 - 3: 'try_block_done'
 - 4: 'finally_executed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
