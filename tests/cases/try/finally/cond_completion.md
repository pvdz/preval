# Preval test case

# cond_completion.md

> Try > Finally > Cond completion
>
>

## Input

`````js filename=intro
function f(){
  try {
    if (a) return 1;
    if (b) throw 2;
  } finally {
    return 3;
  }
}
log(f());
`````


## Settled


`````js filename=intro
log;
try {
  if (a) {
  } else {
    b;
  }
} catch ($finalImplicit) {}
log(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
log;
try {
  if (!a) {
    b;
  }
} catch ($finalImplicit) {}
log(3);
`````


## PST Settled
With rename=true

`````js filename=intro
log;
try {
  if (a) {

  }
  else {
    b;
  }
}
catch (c) {

}
log( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalStep$1 = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  let $finalArg$1 = undefined;
  $finally: {
    try {
      if (a) {
        $finalStep = true;
        $finalArg = 1;
        break $finally;
      } else {
        if (b) {
          $finalStep$1 = true;
          $finalArg$1 = 2;
          break $finally;
        } else {
        }
      }
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return 3;
};
const tmpCallCallee = log;
let tmpCalleeParam = f();
log(tmpCalleeParam);
`````


## Todos triggered


- (todo) support LabeledStatement as statement in let_hoisting noob check


## Globals


BAD@! Found 3 implicit global bindings:

log, a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
