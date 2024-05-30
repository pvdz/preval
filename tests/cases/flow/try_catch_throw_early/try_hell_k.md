# Preval test case

# try_hell_k.md

> Flow > Try catch throw early > Try hell k
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    throw_early
    break foo;
  } catch {
    throw_early
    // Do not assume x will be 1 for it may still crash.
    x = 1
  } finally {
  }
}
considerMutated(x) // always true
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
        throw_early;
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
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      break foo;
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
      throw_early;
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
    if ($finalStep) {
      break foo;
    } else {
    }
  }
}
considerMutated(x);
`````

## Output

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  throw_early;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  considerMutated(0);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
let b = undefined;
try {
  throw_early;
}
catch ($finalImplicit) {
  a = true;
  b = $finalImplicit;
}
if (a) {
  throw b;
}
else {
  considerMutated( 0 );
}
`````

## Globals

BAD@! Found 3 implicit global bindings:

throw_early, $finalImplicit, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
