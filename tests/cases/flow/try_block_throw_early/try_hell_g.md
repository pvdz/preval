# Preval test case

# try_hell_g.md

> Flow > Try block throw early > Try hell g
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} catch {

} finally {
  x = 1
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
      fail_early;
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
try {
  fail_early;
} catch ($finalImplicit) {
  x = 1;
  throw $finalImplicit;
}
x = 1;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## Output


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {
  throw $finalImplicit;
}
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {
  throw a;
}
considerMutated( 1 );
`````

## Globals

BAD@! Found 2 implicit global bindings:

fail_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
