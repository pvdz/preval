# Preval test case

# try_hell_h.md

> Flow > Try finally throw early > Try hell h
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    if ($) break foo;
  } catch {
    // Now we know it can't get here
    // Though in real world code a throw can happen pretty much anywhere
    // So we must assume the worst and consider the catch potentially visited
    // So we must consider x might have mutated after the try is resolved
    x = 1
  } finally {
    throw_early
  }
}
considerMutated(x) // always true
`````

## Settled


`````js filename=intro
throw_early;
considerMutated(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
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
        if ($) {
          $finalStep = true;
          break $finally;
        }
      } catch ($finalImplicit) {
        throw_early;
        throw $finalImplicit;
      }
    }
    {
      throw_early;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else if ($finalStep) break foo;
    else {
    }
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
      if ($) {
        $finalStep = true;
        break $finally;
      } else {
      }
    } catch ($finalImplicit) {
      throw_early;
      throw $finalImplicit;
    }
  }
  throw_early;
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      break foo;
    } else {
    }
  }
}
considerMutated(x);
`````

## PST Settled
With rename=true

`````js filename=intro
throw_early;
considerMutated( 0 );
`````

## Globals

BAD@! Found 2 implicit global bindings:

throw_early, considerMutated

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
