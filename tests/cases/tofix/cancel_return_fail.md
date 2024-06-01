# Preval test case

# cancel_return_fail.md

> Tofix > Cancel return fail
>
> Just random things
> The hack: { break hack } thing should also be removed

#TODO

## Input

`````js filename=intro
function f() {
  try {
    return 1;
  } finally {
    hack: break hack; // Spoilers: does not cancel the return
  }
  return 2;
}
$(f()); // 1
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
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
      hack: break hack;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else return $finalArg;
  }
  return 2;
};
$(f());
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
      $finalArg = 1;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  hack: {
    break hack;
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return $finalArg;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
