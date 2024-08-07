# Preval test case

# try_hell_e.md

> Flow > Try finally throw early > Try hell e
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {

} finally {
  throw_early
  x = 2
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
      throw_early;
      x = 2;
      throw $finalImplicit;
    }
  }
  {
    throw_early;
    x = 2;
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
  throw_early;
  x = 2;
  throw $finalImplicit;
}
throw_early;
x = 2;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## Output


`````js filename=intro
throw_early;
considerMutated(2);
`````

## PST Output

With rename=true

`````js filename=intro
throw_early;
considerMutated( 2 );
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
