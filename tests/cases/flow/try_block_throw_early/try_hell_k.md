# Preval test case

# try_hell_k.md

> Flow > Try block throw early > Try hell k
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    fail_early
    break foo;
  } catch {
    // The break should not prevent this assignment from being picked up
    x = 2;
  } finally {
  }
}
considerMutated(x) // always true
`````

## Settled


`````js filename=intro
fail_early;
considerMutated(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
fail_early;
considerMutated(0);
`````

## Pre Normal


`````js filename=intro
let x = 0;
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
    }
    if ($implicitThrow) throw $finalCatchArg;
    else break foo;
  }
}
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
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
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    break foo;
  }
}
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
fail_early;
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
