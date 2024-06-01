# Preval test case

# try_hell_d.md

> Flow > Try block throw early > Try hell d
>
> Bunch of try/catch/finally cases

#TODO

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
try {
  fail_early;
  x = 1;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## Output

`````js filename=intro
let x = 0;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  fail_early;
  x = 1;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
let b = false;
let c = undefined;
try {
  fail_early;
  a = 1;
}
catch (d) {
  b = true;
  c = d;
}
if (b) {
  throw c;
}
else {
  considerMutated( a );
}
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
