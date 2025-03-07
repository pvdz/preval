# Preval test case

# try_hell_m.md

> Flow > Try block throw early > Try hell m
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      fail_early
      break foo;
    } finally {
      return
    }
    // This is dead code regardless?
    console.log(x);
  }
  // Dead code because the finalizer return overrides the break
  x = 'fail';
}
f();
considerMutated(x) // always false
`````

## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
considerMutated(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
considerMutated(0);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  foo: {
    {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      $finally: {
        try {
          fail_early;
          {
            $finalStep = true;
            break $finally;
          }
        } catch ($finalImplicit) {
          $implicitThrow = true;
          $finalCatchArg = $finalImplicit;
        }
      }
      {
        return;
      }
      if ($implicitThrow) throw $finalCatchArg;
      else break foo;
    }
    console.log(x);
  }
  x = `fail`;
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  foo: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        fail_early;
        $finalStep = true;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    return undefined;
  }
  x = `fail`;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {

}
considerMutated( 0 );
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
