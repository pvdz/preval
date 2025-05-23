# Preval test case

# cond_completion2.md

> Try > Finally > Cond completion2
>
>

## Options

- globals: a b

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
$(f());
`````


## Settled


`````js filename=intro
try {
  if (a) {
  } else {
    b;
  }
} catch ($finalImplicit) {}
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if (!a) {
    b;
  }
} catch ($finalImplicit) {}
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  if (a) {

  }
  else {
    b;
  }
}
catch (c) {

}
$( 3 );
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
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None (except for the 2 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
