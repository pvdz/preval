# Preval test case

# ai_rule358_nested_try_finally_returns_outer_finally_effect.md

> Ai > Ai3 > Ai rule358 nested try finally returns outer finally effect
>
> Test: Nested try...finally; inner try/finally return; outer finally has effects.

## Input

`````js filename=intro
// Expected: (outer finally effect runs, result is from inner finally return)
function testFunction() {
  try {
    try {
      $('inner_try_block');
      return $('return_from_inner_try');
    } finally {
      $('inner_finally_block');
      return $('return_from_inner_finally'); // This return should take precedence
    }
  } finally {
    $('outer_finally_block_effect');
    // No return statement in outer finally
  }
  $('after_outer_finally_unreachable'); // Should be unreachable
}

let result_val;
try {
  result_val = testFunction();
  $('final_result_after_call', result_val);
} catch (e) {
  $('test_function_threw', e);
}
$('script_done');
`````


## Settled


`````js filename=intro
let $finalArg$1 /*:unknown*/ = undefined;
try {
  try {
    try {
      $(`inner_try_block`);
      $(`return_from_inner_try`);
    } catch ($finalImplicit) {}
    $(`inner_finally_block`);
    $finalArg$1 = $(`return_from_inner_finally`);
  } catch ($finalImplicit$1) {
    $(`outer_finally_block_effect`);
    throw $finalImplicit$1;
  }
  $(`outer_finally_block_effect`);
  $(`final_result_after_call`, $finalArg$1);
} catch (e) {
  $(`test_function_threw`, e);
}
$(`script_done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $finalArg$1 = undefined;
try {
  try {
    try {
      $(`inner_try_block`);
      $(`return_from_inner_try`);
    } catch ($finalImplicit) {}
    $(`inner_finally_block`);
    $finalArg$1 = $(`return_from_inner_finally`);
  } catch ($finalImplicit$1) {
    $(`outer_finally_block_effect`);
    throw $finalImplicit$1;
  }
  $(`outer_finally_block_effect`);
  $(`final_result_after_call`, $finalArg$1);
} catch (e) {
  $(`test_function_threw`, e);
}
$(`script_done`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  try {
    try {
      $( "inner_try_block" );
      $( "return_from_inner_try" );
    }
    catch (b) {

    }
    $( "inner_finally_block" );
    a = $( "return_from_inner_finally" );
  }
  catch (c) {
    $( "outer_finally_block_effect" );
    throw c;
  }
  $( "outer_finally_block_effect" );
  $( "final_result_after_call", a );
}
catch (d) {
  $( "test_function_threw", d );
}
$( "script_done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testFunction = function () {
  debugger;
  let $implicitThrow$1 = false;
  let $finalStep$1 = false;
  let $finalStep$3 = false;
  let $finalStep$5 = false;
  let $finalCatchArg$1 = undefined;
  let $finalArg$1 = undefined;
  let $finalArg$3 = undefined;
  let $finalArg$5 = undefined;
  $finally$1: {
    try {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      let $finalArg = undefined;
      $finally: {
        try {
          $(`inner_try_block`);
          $finalStep = true;
          $finalArg = $(`return_from_inner_try`);
          break $finally;
        } catch ($finalImplicit) {
          $implicitThrow = true;
          $finalCatchArg = $finalImplicit;
        }
      }
      $(`inner_finally_block`);
      $finalStep$1 = true;
      $finalArg$1 = $(`return_from_inner_finally`);
      break $finally$1;
    } catch ($finalImplicit$1) {
      $(`outer_finally_block_effect`);
      throw $finalImplicit$1;
    }
  }
  $(`outer_finally_block_effect`);
  if ($implicitThrow$1) {
    throw $finalCatchArg$1;
  } else {
    if ($finalStep$1) {
      return $finalArg$1;
    } else {
      if ($finalStep$3) {
        throw $finalArg$3;
      } else {
        if ($finalStep$5) {
          return $finalArg$5;
        } else {
          $(`after_outer_finally_unreachable`);
          return undefined;
        }
      }
    }
  }
};
let result_val = undefined;
try {
  result_val = testFunction();
  $(`final_result_after_call`, result_val);
} catch (e) {
  $(`test_function_threw`, e);
}
$(`script_done`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner_try_block'
 - 2: 'return_from_inner_try'
 - 3: 'inner_finally_block'
 - 4: 'return_from_inner_finally'
 - 5: 'outer_finally_block_effect'
 - 6: 'final_result_after_call', 'return_from_inner_finally'
 - 7: 'script_done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
