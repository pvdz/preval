# Preval test case

# try_hell_q.md

> Flow > Try block throw early > Try hell q
>
> Bunch of try/catch/finally cases0

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    fail_early
    x = 1;
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
considerMutated(x) // always true (!)
`````

## Settled


`````js filename=intro
let x /*:number*/ = 0;
try {
  fail_early;
  x = 1;
} catch ($finalImplicit) {}
considerMutated(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch ($finalImplicit) {}
considerMutated(x);
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
        fail_early;
        x = 1;
        {
          $finalStep = true;
          $finalArg = `one`;
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
  try {
    fail_early;
    x = 1;
    $finalStep = true;
    $finalArg = `one`;
    return undefined;
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
  a = 1;
}
catch (b) {

}
considerMutated( a );
`````

## Globals

BAD@! Found 2 implicit global bindings:

fail_early, considerMutated

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
