# Preval test case

# finally_cancels_return.md

> Try > Finally cancels return

## Input

`````js filename=intro
function f() {
  hack: try {
    return 1;
  } finally {
    break hack; // Spoilers: does cancel the return
  }
  return 2;
}
$(f()); // 2
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
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
      $finalStep = true;
      $finalArg = 1;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return 2;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal
- (todo) support LabeledStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
