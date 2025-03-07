# Preval test case

# try_hell_e.md

> Flow > Try block throw early > Try hell e
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
  x = 1
} catch {

} finally {

}
considerMutated(x) // always true
`````

## Settled


`````js filename=intro
fail_early;
considerMutated(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
fail_early;
considerMutated(1);
`````

## Pre Normal


`````js filename=intro
let x = 0;
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      fail_early;
      x = 1;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
fail_early;
x = 1;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
fail_early;
considerMutated( 1 );
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
