# Preval test case

# try_hell_arrow.md

> Flow > Try catch throw early > Try hell arrow
>
> Just trying to trip an arrow case

## Input

`````js filename=intro
let x = 0;
const f = () => {
  foo: {
    try {
      throw 'not me';
    } finally {
      return
    }
  }
}
f();
considerMutated(x) // always false
`````

## Settled


`````js filename=intro
considerMutated(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(0);
`````

## Pre Normal


`````js filename=intro
let x = 0;
const f = () => {
  debugger;
  foo: {
    {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      let $finalArg = undefined;
      $finally: {
        try {
          {
            $finalStep = true;
            $finalArg = `not me`;
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
      else throw $finalArg;
    }
  }
};
f();
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
const f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      $finalArg = `not me`;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return undefined;
};
f();
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
considerMutated( 0 );
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
