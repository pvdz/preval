# Preval test case

# ai_try_catch_unused_err_side_effect.md

> Ai > Ai2 > Ai try catch unused err side effect
>
> Test: try...catch where catch variable is unused but block has side-effects.

## Input

`````js filename=intro
// Expected: try { throw $('error'); } catch (e_unused) { $('catch_side_effect'); } (or equivalent)
try {
  $('try_block_attempt');
  throw $('error_source');
  $('unreachable_in_try');
} catch (err) {
  $('catch_block_side_effect');
}
$('after_try_catch');
`````


## Settled


`````js filename=intro
try {
  $(`try_block_attempt`);
  const tmpThrowArg /*:unknown*/ = $(`error_source`);
  throw tmpThrowArg;
} catch (err) {
  $(`catch_block_side_effect`);
}
$(`after_try_catch`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`try_block_attempt`);
  const tmpThrowArg = $(`error_source`);
  throw tmpThrowArg;
} catch (err) {
  $(`catch_block_side_effect`);
}
$(`after_try_catch`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "try_block_attempt" );
  const a = $( "error_source" );
  throw a;
}
catch (b) {
  $( "catch_block_side_effect" );
}
$( "after_try_catch" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(`try_block_attempt`);
  const tmpThrowArg = $(`error_source`);
  throw tmpThrowArg;
} catch (err) {
  $(`catch_block_side_effect`);
}
$(`after_try_catch`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try_block_attempt'
 - 2: 'error_source'
 - 3: 'catch_block_side_effect'
 - 4: 'after_try_catch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
