# Preval test case

# try_hell_g.md

> Flow > Try no throw > Try hell g
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {

} catch {

} finally {
  x = 1
}
considerMutated(x) // always true
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
let x = 0;
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
    } catch ($finalImplicit) {
      x = 1;
      throw $finalImplicit;
    }
  }
  {
    x = 1;
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
