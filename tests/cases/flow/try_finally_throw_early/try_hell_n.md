# Preval test case

# try_hell_n.md

> Flow > Try finally throw early > Try hell n
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      throw 'not me';
    } finally {
      throw_early
      return
    }
  }
}
f();
considerMutated(x) // always false
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      let $finalArg = undefined;
      $finally: {
        try {
          {
            $finalStep = true;
            $finalArg = `not me`;
            break $finally;
          }
        } catch ($finalImplicit) {
          $implicitThrow = true;
          $finalCatchArg = $finalImplicit;
        }
      }
      {
        throw_early;
        return;
      }
      if ($implicitThrow) throw $finalCatchArg;
      else throw $finalArg;
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
      $finalStep = true;
      $finalArg = `not me`;
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
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
throw_early;
considerMutated( 0 );
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
