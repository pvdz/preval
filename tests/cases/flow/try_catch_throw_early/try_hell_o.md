# Preval test case

# try_hell_o.md

> Flow > Try catch throw early > Try hell o
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw x;
  } finally {
    break stop; // Overrides the throw
  }
  x = 1;
}
f();
considerMutated(x) // always true (!)
`````

## Settled


`````js filename=intro
considerMutated(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(1);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  stop: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        {
          $finalStep = true;
          $finalArg = x;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      break stop;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else throw $finalArg;
  }
  x = 1;
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized


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
      $finalArg = x;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  x = 1;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
considerMutated( 1 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

considerMutated

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
