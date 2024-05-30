# Preval test case

# try_hell_q.md

> Flow > Try finally throw early > Try hell q
>
> Bunch of try/catch/finally cases0

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    x = 1;
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    throw_early
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
        x = 1;
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
      throw_early;
      break stop;
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      throw $finalArg;
    }
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
  $finally: {
    try {
      x = 1;
      $finalStep = true;
      $finalArg = `one`;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  throw_early;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
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
