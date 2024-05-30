# Preval test case

# try_hell_l.md

> Flow > Try catch throw early > Try hell l
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      break foo;
    } finally {
      return
    }
    // This is dead code regardless?
    console.log(x);
  }
  // Dead code because the finalizer return overrides the break
  x = 'fail';
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
      $finally: {
        try {
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
        return;
      }
      if ($implicitThrow) {
        throw $finalCatchArg;
      }
      if ($finalStep) {
        break foo;
      }
    }
    console.log(x);
  }
  x = `fail`;
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
  $finally: {
    try {
      $finalStep = true;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
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
