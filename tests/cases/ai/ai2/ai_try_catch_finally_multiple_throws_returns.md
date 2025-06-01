# Preval test case

# ai_try_catch_finally_multiple_throws_returns.md

> Ai > Ai2 > Ai try catch finally multiple throws returns
>
> Test: try-catch-finally with multiple throws/returns.

## Input

`````js filename=intro
// Expected: JS specified order of operations and error/return propagation.
function testThrows() {
  try {
    $('try_throws_start');
    throw $('err_try');
  } catch (e) {
    $('catch_throws_receives', e);
    throw $('err_catch');
  } finally {
    $('finally_throws_executes');
    // In JS, if finally throws, it supersedes try/catch throws.
    throw $('err_finally');
  }
  $('unreachable_after_finally_throw');
}

try { testThrows(); } catch (e) { $('final_error_caught_throws', e); }

function testReturns() {
  try {
    $('try_returns_start');
    return $('ret_try');
  } finally {
    $('finally_returns_executes');
    // If finally returns, it supersedes try's return.
    return $('ret_finally');
  }
  $('unreachable_after_finally_return');
}
$('final_return_value', testReturns());
`````


## Settled


`````js filename=intro
try {
  try {
    $(`try_throws_start`);
    const tmpThrowArg /*:unknown*/ = $(`err_try`);
    throw tmpThrowArg;
  } catch (e) {
    try {
      $(`catch_throws_receives`, e);
      $(`err_catch`);
    } catch ($finalImplicit$1) {}
  }
  $(`finally_throws_executes`);
  const tmpThrowArg$1 /*:unknown*/ = $(`err_finally`);
  throw tmpThrowArg$1;
} catch (e$3) {
  $(`final_error_caught_throws`, e$3);
}
try {
  $(`try_returns_start`);
  $(`ret_try`);
} catch ($finalImplicit) {}
$(`finally_returns_executes`);
const tmpReturnArg /*:unknown*/ = $(`ret_finally`);
$(`final_return_value`, tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  try {
    $(`try_throws_start`);
    const tmpThrowArg = $(`err_try`);
    throw tmpThrowArg;
  } catch (e) {
    try {
      $(`catch_throws_receives`, e);
      $(`err_catch`);
    } catch ($finalImplicit$1) {}
  }
  $(`finally_throws_executes`);
  const tmpThrowArg$1 = $(`err_finally`);
  throw tmpThrowArg$1;
} catch (e$3) {
  $(`final_error_caught_throws`, e$3);
}
try {
  $(`try_returns_start`);
  $(`ret_try`);
} catch ($finalImplicit) {}
$(`finally_returns_executes`);
$(`final_return_value`, $(`ret_finally`));
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  try {
    $( "try_throws_start" );
    const a = $( "err_try" );
    throw a;
  }
  catch (b) {
    try {
      $( "catch_throws_receives", b );
      $( "err_catch" );
    }
    catch (c) {

    }
  }
  $( "finally_throws_executes" );
  const d = $( "err_finally" );
  throw d;
}
catch (e) {
  $( "final_error_caught_throws", e );
}
try {
  $( "try_returns_start" );
  $( "ret_try" );
}
catch (f) {

}
$( "finally_returns_executes" );
const g = $( "ret_finally" );
$( "final_return_value", g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testReturns = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $(`try_returns_start`);
      $finalStep = true;
      $finalArg = $(`ret_try`);
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(`finally_returns_executes`);
  const tmpReturnArg = $(`ret_finally`);
  return tmpReturnArg;
};
let testThrows = function () {
  debugger;
  let $implicitThrow$1 = false;
  let $finalStep$1 = false;
  let $finalCatchArg$1 = undefined;
  let $finalArg$1 = undefined;
  $finally$1: {
    try {
      $(`try_throws_start`);
      const tmpThrowArg = $(`err_try`);
      throw tmpThrowArg;
    } catch (e) {
      try {
        $(`catch_throws_receives`, e);
        $finalStep$1 = true;
        $finalArg$1 = $(`err_catch`);
        break $finally$1;
      } catch ($finalImplicit$1) {
        $implicitThrow$1 = true;
        $finalCatchArg$1 = $finalImplicit$1;
      }
    }
  }
  $(`finally_throws_executes`);
  const tmpThrowArg$1 = $(`err_finally`);
  throw tmpThrowArg$1;
};
try {
  testThrows();
} catch (e$1) {
  $(`final_error_caught_throws`, e$1);
}
let tmpCalleeParam = testReturns();
$(`final_return_value`, tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try_throws_start'
 - 2: 'err_try'
 - 3: 'catch_throws_receives', 'err_try'
 - 4: 'err_catch'
 - 5: 'finally_throws_executes'
 - 6: 'err_finally'
 - 7: 'final_error_caught_throws', 'err_finally'
 - 8: 'try_returns_start'
 - 9: 'ret_try'
 - 10: 'finally_returns_executes'
 - 11: 'ret_finally'
 - 12: 'final_return_value', 'ret_finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
