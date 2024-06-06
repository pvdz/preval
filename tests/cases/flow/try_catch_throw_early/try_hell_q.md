# Preval test case

# try_hell_q.md

> Flow > Try catch throw early > Try hell q
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
    throw_early
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
//considerMutated(x) // always true (!)
$(x);
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
      break stop;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else throw $finalArg;
  }
};
let x = 0;
f();
$(x);
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
$(x);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
