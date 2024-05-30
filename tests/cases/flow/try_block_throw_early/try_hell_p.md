# Preval test case

# try_hell_p.md

> Flow > Try block throw early > Try hell p
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    fail_early
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
  x = 1;
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
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      throw $finalArg;
    }
  }
  x = 1;
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized

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
        $finalStep = true;
        $finalArg = `one`;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    break stop;
  }
  x = 1;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  fail_early;
}
catch ($finalImplicit) {

}
considerMutated( 1 );
`````

## Globals

BAD@! Found 3 implicit global bindings:

fail_early, $finalImplicit, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
