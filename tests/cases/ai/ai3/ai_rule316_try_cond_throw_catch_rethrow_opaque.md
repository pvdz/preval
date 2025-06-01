# Preval test case

# ai_rule316_try_cond_throw_catch_rethrow_opaque.md

> Ai > Ai3 > Ai rule316 try cond throw catch rethrow opaque
>
> Test: try with conditional opaque throw, catch re-throws opaque error.

## Input

`````js filename=intro
// Expected: try { if ($('cond_throw')) throw $('err1'); $('try_ok'); } catch (e) { $('caught_e', e); throw $('err2'); } $('finally_ish_unreachable');
try {
  if ($('cond_throw')) {
    throw $('err1');
  }
  $('try_ok');
} catch (e) {
  $('caught_e', e);
  throw $('err2');
}
$('finally_ish_unreachable'); // Should be unreachable if either throw happens
`````


## Settled


`````js filename=intro
try {
  const tmpIfTest /*:unknown*/ = $(`cond_throw`);
  if (tmpIfTest) {
    const tmpThrowArg /*:unknown*/ = $(`err1`);
    throw tmpThrowArg;
  } else {
    $(`try_ok`);
  }
} catch (e) {
  $(`caught_e`, e);
  const tmpThrowArg$1 /*:unknown*/ = $(`err2`);
  throw tmpThrowArg$1;
}
$(`finally_ish_unreachable`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if ($(`cond_throw`)) {
    const tmpThrowArg = $(`err1`);
    throw tmpThrowArg;
  } else {
    $(`try_ok`);
  }
} catch (e) {
  $(`caught_e`, e);
  const tmpThrowArg$1 = $(`err2`);
  throw tmpThrowArg$1;
}
$(`finally_ish_unreachable`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "cond_throw" );
  if (a) {
    const b = $( "err1" );
    throw b;
  }
  else {
    $( "try_ok" );
  }
}
catch (c) {
  $( "caught_e", c );
  const d = $( "err2" );
  throw d;
}
$( "finally_ish_unreachable" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpIfTest = $(`cond_throw`);
  if (tmpIfTest) {
    const tmpThrowArg = $(`err1`);
    throw tmpThrowArg;
  } else {
    $(`try_ok`);
  }
} catch (e) {
  $(`caught_e`, e);
  const tmpThrowArg$1 = $(`err2`);
  throw tmpThrowArg$1;
}
$(`finally_ish_unreachable`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond_throw'
 - 2: 'err1'
 - 3: 'caught_e', 'err1'
 - 4: 'err2'
 - eval returned: ('<crash[ err2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
