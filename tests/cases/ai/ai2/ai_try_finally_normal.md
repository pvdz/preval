# Preval test case

# ai_try_finally_normal.md

> Ai > Ai2 > Ai try finally normal
>
> Test: try...finally (no catch) with normal completion.

## Input

`````js filename=intro
// Expected: try { $('try_done'); } finally { $('finally_run'); } (or equivalent)
try {
  $('try_block');
  let x = 1 + 1;
  $('try_done');
} finally {
  $('finally_run');
}
`````


## Settled


`````js filename=intro
try {
  $(`try_block`);
  $(`try_done`);
} catch ($finalImplicit) {
  $(`finally_run`);
  throw $finalImplicit;
}
$(`finally_run`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`try_block`);
  $(`try_done`);
} catch ($finalImplicit) {
  $(`finally_run`);
  throw $finalImplicit;
}
$(`finally_run`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "try_block" );
  $( "try_done" );
}
catch (a) {
  $( "finally_run" );
  throw a;
}
$( "finally_run" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(`try_block`);
  let x = 2;
  $(`try_done`);
} catch ($finalImplicit) {
  $(`finally_run`);
  throw $finalImplicit;
}
$(`finally_run`);
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
 - 1: 'try_block'
 - 2: 'try_done'
 - 3: 'finally_run'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
