# Preval test case

# ai_rule327_try_finally_return_opaque_both.md

> Ai > Ai3 > Ai rule327 try finally return opaque both
>
> Test: try...finally where both try and finally return opaque values.

## Input

`````js filename=intro
// Expected: function f() { try { return $('try_ret'); } finally { return $('finally_ret'); } } $('result', f());
function f() {
  try {
    $('in_try');
    return $('try_ret');
  } finally {
    $('in_finally');
    return $('finally_ret');
  }
}
$('result', f());
`````


## Settled


`````js filename=intro
try {
  $(`in_try`);
  $(`try_ret`);
} catch ($finalImplicit) {}
$(`in_finally`);
const tmpReturnArg /*:unknown*/ = $(`finally_ret`);
$(`result`, tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`in_try`);
  $(`try_ret`);
} catch ($finalImplicit) {}
$(`in_finally`);
$(`result`, $(`finally_ret`));
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "in_try" );
  $( "try_ret" );
}
catch (a) {

}
$( "in_finally" );
const b = $( "finally_ret" );
$( "result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $(`in_try`);
      $finalStep = true;
      $finalArg = $(`try_ret`);
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(`in_finally`);
  const tmpReturnArg = $(`finally_ret`);
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(`result`, tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support LabeledStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'in_try'
 - 2: 'try_ret'
 - 3: 'in_finally'
 - 4: 'finally_ret'
 - 5: 'result', 'finally_ret'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
