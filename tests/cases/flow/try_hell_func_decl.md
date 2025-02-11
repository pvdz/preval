# Preval test case

# try_hell_func_decl.md

> Flow > Try hell func decl
>
> This is why we don't properly analyze the try/catch/finally for mutation state. And this is just the tip of the ice berg. No thank you.

## Input

`````js filename=intro

{
  let x = 0;
  function f() {
    stop: try {
      x = 1;
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  considerMutated(x) // always true (!)
}

{
  let x = 0;
  function f() {
    stop: try {
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
}
`````

## Pre Normal


`````js filename=intro
{
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
        break stop;
      }
      if ($implicitThrow) throw $finalCatchArg;
      else throw $finalArg;
    }
  };
  let x = 0;
  f();
  considerMutated(x);
}
{
  let f$1 = function () {
    debugger;
    stop$1: {
      let $implicitThrow$1 = false;
      let $finalStep$1 = false;
      let $finalCatchArg$1 = undefined;
      let $finalArg$1 = undefined;
      $finally$1: {
        try {
          {
            $finalStep$1 = true;
            $finalArg$1 = `one`;
            break $finally$1;
          }
        } catch ($finalImplicit$1) {
          $implicitThrow$1 = true;
          $finalCatchArg$1 = $finalImplicit$1;
        }
      }
      {
        break stop$1;
      }
      if ($implicitThrow$1) throw $finalCatchArg$1;
      else throw $finalArg$1;
    }
  };
  let x$1 = 0;
  f$1();
  considerMutated(x$1);
}
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
    x = 1;
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
let f$1 = function () {
  debugger;
  let $implicitThrow$1 = false;
  let $finalStep$1 = false;
  let $finalCatchArg$1 = undefined;
  let $finalArg$1 = undefined;
  try {
    $finalStep$1 = true;
    $finalArg$1 = `one`;
    return undefined;
  } catch ($finalImplicit$1) {
    $implicitThrow$1 = true;
    $finalCatchArg$1 = $finalImplicit$1;
  }
  return undefined;
};
let x$1 = 0;
f$1();
considerMutated(x$1);
`````

## Output


`````js filename=intro
considerMutated(1);
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
considerMutated( 1 );
considerMutated( 0 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
