# Preval test case

# ai_try_empty_catch_opaque_throw.md

> Ai > Ai2 > Ai try empty catch opaque throw
>
> Test: try...catch with empty catch, try opaquely throws.

## Input

`````js filename=intro
// Expected: try { $('may_throw'); } catch (e) {} (or equivalent, error swallowed)
try {
  $('try_block_attempt');
  if ($('condition')) {
    throw $('error_source');
  }
  $('try_block_success');
} catch (e) {
  // Empty catch, swallows error
}
$('after_try_catch');
`````


## Settled


`````js filename=intro
try {
  $(`try_block_attempt`);
  const tmpIfTest /*:unknown*/ = $(`condition`);
  if (tmpIfTest) {
    const tmpThrowArg /*:unknown*/ = $(`error_source`);
    throw tmpThrowArg;
  } else {
    $(`try_block_success`);
  }
} catch (e) {}
$(`after_try_catch`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`try_block_attempt`);
  if ($(`condition`)) {
    const tmpThrowArg = $(`error_source`);
    throw tmpThrowArg;
  } else {
    $(`try_block_success`);
  }
} catch (e) {}
$(`after_try_catch`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "try_block_attempt" );
  const a = $( "condition" );
  if (a) {
    const b = $( "error_source" );
    throw b;
  }
  else {
    $( "try_block_success" );
  }
}
catch (c) {

}
$( "after_try_catch" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(`try_block_attempt`);
  const tmpIfTest = $(`condition`);
  if (tmpIfTest) {
    const tmpThrowArg = $(`error_source`);
    throw tmpThrowArg;
  } else {
    $(`try_block_success`);
  }
} catch (e) {}
$(`after_try_catch`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try_block_attempt'
 - 2: 'condition'
 - 3: 'error_source'
 - 4: 'after_try_catch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
