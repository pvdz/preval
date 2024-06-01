# Preval test case

# try_finally_func.md

> Try > Finally > Try finally func
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  
} finally {
  function f() {
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x); // can see 1 2
    }
  }
  $(f);
}
`````

## Pre Normal

`````js filename=intro
{
  let $implicitThrow$1 = false;
  let $finalCatchArg$1 = undefined;
  $finally$1: {
    try {
    } catch ($finalImplicit$1) {
      $implicitThrow$1 = true;
      $finalCatchArg$1 = $finalImplicit$1;
    }
  }
  {
    let f = function () {
      debugger;
      let x = 1;
      {
        let $implicitThrow = false;
        let $finalStep = false;
        let $finalCatchArg = undefined;
        let $finalArg = undefined;
        $finally: {
          try {
            if ($()) {
              x = 2;
              {
                $finalStep = true;
                $finalArg = 100;
                break $finally;
              }
            }
          } catch ($finalImplicit) {
            $implicitThrow = true;
            $finalCatchArg = $finalImplicit;
          }
        }
        {
          $(x);
        }
        if ($implicitThrow) throw $finalCatchArg;
        else if ($finalStep) return $finalArg;
        else {
        }
      }
    };
    $(f);
  }
  if ($implicitThrow$1) throw $finalCatchArg$1;
  else {
  }
}
`````

## Normalized

`````js filename=intro
let $implicitThrow$1 = false;
let $finalCatchArg$1 = undefined;
let f = function () {
  debugger;
  let x = 1;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      const tmpIfTest = $();
      if (tmpIfTest) {
        x = 2;
        $finalStep = true;
        $finalArg = 100;
        break $finally;
      } else {
      }
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      return $finalArg;
    } else {
      return undefined;
    }
  }
};
$(f);
if ($implicitThrow$1) {
  throw $finalCatchArg$1;
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = 1;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  try {
    const tmpIfTest = $();
    if (tmpIfTest) {
      x = 2;
      $finalStep = true;
      $finalArg = 100;
    } else {
    }
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      return $finalArg;
    } else {
      return undefined;
    }
  }
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  let c = false;
  let d = false;
  let e = undefined;
  let f = undefined;
  try {
    const g = $();
    if (g) {
      b = 2;
      d = true;
      f = 100;
    }
  }
catch (h) {
    c = true;
    e = h;
  }
  $( b );
  if (c) {
    throw e;
  }
  else {
    if (d) {
      return f;
    }
    else {
      return undefined;
    }
  }
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
