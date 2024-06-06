# Preval test case

# try_hell_r.md

> Flow > Try block throw early > Try hell r
>
> Bunch of try/catch/finally cases0

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    fail_early
    throw 'one';
  } catch {
    x = 2;
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
considerMutated(x) // always true (!)
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  stop: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        fail_early;
        {
          $finalStep = true;
          $finalArg = `one`;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      break stop;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else throw $finalArg;
  }
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  try {
    fail_early;
    $finalStep = true;
    $finalArg = `one`;
    return undefined;
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  try {
    fail_early;
    return undefined;
  } catch ($finalImplicit) {}
  return undefined;
};
f();
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    fail_early;
    return undefined;
  }
catch (b) {

  }
  return undefined;
};
a();
considerMutated( 0 );
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
