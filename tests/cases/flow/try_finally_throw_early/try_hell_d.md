# Preval test case

# try_hell_d.md

> Flow > Try finally throw early > Try hell d
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {

} finally {
  throw_early
}
considerMutated(x) // always true
`````

## Pre Normal


`````js filename=intro
let x = 0;
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      x = 1;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
    throw_early;
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
try {
  x = 1;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
throw_early;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## Output


`````js filename=intro
throw_early;
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
throw_early;
considerMutated( 1 );
`````

## Globals

BAD@! Found 2 implicit global bindings:

throw_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
