# Preval test case

# ai_unreachable_catch_via_return_in_func.md

> Ai > Ai1 > Ai unreachable catch via return in func
>
> Test: Unreachable catch block due to unconditional return in try within a function.

## Input

`````js filename=intro
// Expected: function f() { try { $("in_try"); return $("return_val"); } catch (e) { /* empty or removed */ } } let res = f(); $("f_called", res);
function f() {
  try {
    $("in_try");
    return $("return_val");
    $("after_return_in_try_unreachable");
  } catch (e) {
    $("in_catch_UNREACHABLE");
  }
  $("after_try_catch_in_func_unreachable");
}
let result = f();
$("f_called", result);
`````


## Settled


`````js filename=intro
let result /*:unknown*/ = undefined;
$inlinedFunction: {
  try {
    $(`in_try`);
    result = $(`return_val`);
    break $inlinedFunction;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_func_unreachable`);
}
$(`f_called`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let result = undefined;
$inlinedFunction: {
  try {
    $(`in_try`);
    result = $(`return_val`);
    break $inlinedFunction;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_func_unreachable`);
}
$(`f_called`, result);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  try {
    $( "in_try" );
    a = $( "return_val" );
    break $inlinedFunction;
  }
  catch (b) {
    $( "in_catch_UNREACHABLE" );
  }
  $( "after_try_catch_in_func_unreachable" );
}
$( "f_called", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  try {
    $(`in_try`);
    const tmpReturnArg = $(`return_val`);
    return tmpReturnArg;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_func_unreachable`);
  return undefined;
};
let result = f();
$(`f_called`, result);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'in_try'
 - 2: 'return_val'
 - 3: 'f_called', 'return_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
