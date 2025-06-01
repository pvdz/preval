# Preval test case

# ai_try_catch_throw_new_unreachable.md

> Ai > Ai1 > Ai try catch throw new unreachable
>
> Test: try-catch where catch block unconditionally throws a new error.

## Input

`````js filename=intro
// Expected: (Structure preserved, after_try_catch removed as unreachable)
try {
  if ($('cond_try_throw')) throw $('err_try');
  $('try_body_nothrow');
} catch (e) {
  $('caught_whatever');
  throw $('err_catch_new');
}
$('after_try_catch');
`````


## Settled


`````js filename=intro
try {
  const tmpIfTest /*:unknown*/ = $(`cond_try_throw`);
  if (tmpIfTest) {
    const tmpThrowArg /*:unknown*/ = $(`err_try`);
    throw tmpThrowArg;
  } else {
    $(`try_body_nothrow`);
  }
} catch (e) {
  $(`caught_whatever`);
  const tmpThrowArg$1 /*:unknown*/ = $(`err_catch_new`);
  throw tmpThrowArg$1;
}
$(`after_try_catch`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if ($(`cond_try_throw`)) {
    const tmpThrowArg = $(`err_try`);
    throw tmpThrowArg;
  } else {
    $(`try_body_nothrow`);
  }
} catch (e) {
  $(`caught_whatever`);
  const tmpThrowArg$1 = $(`err_catch_new`);
  throw tmpThrowArg$1;
}
$(`after_try_catch`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( "cond_try_throw" );
  if (a) {
    const b = $( "err_try" );
    throw b;
  }
  else {
    $( "try_body_nothrow" );
  }
}
catch (c) {
  $( "caught_whatever" );
  const d = $( "err_catch_new" );
  throw d;
}
$( "after_try_catch" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpIfTest = $(`cond_try_throw`);
  if (tmpIfTest) {
    const tmpThrowArg = $(`err_try`);
    throw tmpThrowArg;
  } else {
    $(`try_body_nothrow`);
  }
} catch (e) {
  $(`caught_whatever`);
  const tmpThrowArg$1 = $(`err_catch_new`);
  throw tmpThrowArg$1;
}
$(`after_try_catch`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond_try_throw'
 - 2: 'err_try'
 - 3: 'caught_whatever'
 - 4: 'err_catch_new'
 - eval returned: ('<crash[ err_catch_new ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
