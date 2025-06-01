# Preval test case

# ai_rule341_try_catch_finally_all_opaque.md

> Ai > Ai3 > Ai rule341 try catch finally all opaque
>
> Test: try throws opaque, catch re-throws different opaque, finally has side effects.

## Input

`````js filename=intro
// Expected: try { throw $('errT'); } catch(e) { $('logC', e); throw $('errC'); } finally { $('logF'); } $('done');
try {
  $('in_try');
  throw $('error_try');
} catch (e) {
  $('in_catch', e);
  throw $('error_catch');
} finally {
  $('in_finally');
}
$('after_all'); // Should be unreachable
`````


## Settled


`````js filename=intro
let $finalArg /*:unknown*/ = undefined;
try {
  $(`in_try`);
  const tmpThrowArg /*:unknown*/ = $(`error_try`);
  throw tmpThrowArg;
} catch (e) {
  try {
    $(`in_catch`, e);
    $finalArg = $(`error_catch`);
  } catch ($finalImplicit) {
    $(`in_finally`);
    throw $finalImplicit;
  }
}
$(`in_finally`);
throw $finalArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalArg = undefined;
try {
  $(`in_try`);
  const tmpThrowArg = $(`error_try`);
  throw tmpThrowArg;
} catch (e) {
  try {
    $(`in_catch`, e);
    $finalArg = $(`error_catch`);
  } catch ($finalImplicit) {
    $(`in_finally`);
    throw $finalImplicit;
  }
}
$(`in_finally`);
throw $finalArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  $( "in_try" );
  const b = $( "error_try" );
  throw b;
}
catch (c) {
  try {
    $( "in_catch", c );
    a = $( "error_catch" );
  }
  catch (d) {
    $( "in_finally" );
    throw d;
  }
}
$( "in_finally" );
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
    $(`in_try`);
    const tmpThrowArg = $(`error_try`);
    throw tmpThrowArg;
  } catch (e) {
    try {
      $(`in_catch`, e);
      $finalStep = true;
      $finalArg = $(`error_catch`);
      break $finally;
    } catch ($finalImplicit) {
      $(`in_finally`);
      throw $finalImplicit;
    }
  }
}
$(`in_finally`);
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
 - 1: 'in_try'
 - 2: 'error_try'
 - 3: 'in_catch', 'error_try'
 - 4: 'error_catch'
 - 5: 'in_finally'
 - eval returned: ('<crash[ error_catch ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
