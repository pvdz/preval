# Preval test case

# ai_try_throw_finally.md

> Ai > Ai2 > Ai try throw finally
>
> Test: finally block should execute even if try block throws.

## Input

`````js filename=intro
// Expected: try { throw $('error'); } finally { $('finally_executed'); } (or equivalent normalized form)
try {
  $('try_block_start');
  throw $('error_source');
  $('after_throw_unreachable');
} catch (e) {
  $('catch_block', e);
  throw e; // rethrow to ensure finally still runs
} finally {
  $('finally_executed');
}
`````


## Settled


`````js filename=intro
let $finalArg /*:unknown*/ = undefined;
try {
  $(`try_block_start`);
  const tmpThrowArg /*:unknown*/ = $(`error_source`);
  throw tmpThrowArg;
} catch (e) {
  try {
    $(`catch_block`, e);
    $finalArg = e;
  } catch ($finalImplicit) {
    $(`finally_executed`);
    throw $finalImplicit;
  }
}
$(`finally_executed`);
throw $finalArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalArg = undefined;
try {
  $(`try_block_start`);
  const tmpThrowArg = $(`error_source`);
  throw tmpThrowArg;
} catch (e) {
  try {
    $(`catch_block`, e);
    $finalArg = e;
  } catch ($finalImplicit) {
    $(`finally_executed`);
    throw $finalImplicit;
  }
}
$(`finally_executed`);
throw $finalArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  $( "try_block_start" );
  const b = $( "error_source" );
  throw b;
}
catch (c) {
  try {
    $( "catch_block", c );
    a = c;
  }
  catch (d) {
    $( "finally_executed" );
    throw d;
  }
}
$( "finally_executed" );
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
    $(`try_block_start`);
    const tmpThrowArg = $(`error_source`);
    throw tmpThrowArg;
  } catch (e) {
    try {
      $(`catch_block`, e);
      $finalStep = true;
      $finalArg = e;
      break $finally;
    } catch ($finalImplicit) {
      $(`finally_executed`);
      throw $finalImplicit;
    }
  }
}
$(`finally_executed`);
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
 - 1: 'try_block_start'
 - 2: 'error_source'
 - 3: 'catch_block', 'error_source'
 - 4: 'finally_executed'
 - eval returned: ('<crash[ error_source ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
