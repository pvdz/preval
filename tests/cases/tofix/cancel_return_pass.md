# Preval test case

# cancel_return_pass.md

> Tofix > Cancel return pass
>
> Just random things

#TODO

## Input

`````js filename=intro
function f() {
  hack: try {
    return 1;
  } finally {
    break hack; // Spoilers: does cancel the return
  }
  return 2;
}
$(f()); // 2
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  hack: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        {
          $finalStep = true;
          $finalArg = 1;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      break hack;
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      return $finalArg;
    }
  }
  return 2;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  hack: {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        $finalStep = true;
        $finalArg = 1;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    break hack;
  }
  return 2;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
