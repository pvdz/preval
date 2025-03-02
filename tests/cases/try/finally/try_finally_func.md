# Preval test case

# try_finally_func.md

> Try > Finally > Try finally func
>
> Finally transform checks

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
            $(x);
            throw $finalImplicit;
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
      $(x);
      throw $finalImplicit;
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
const f /*:()=>primitive*/ = function () {
  debugger;
  let x /*:number*/ = 1;
  let $finalStep /*:boolean*/ = false;
  let $finalArg /*:primitive*/ = undefined;
  try {
    const tmpIfTest /*:unknown*/ = $();
    if (tmpIfTest) {
      x = 2;
      $finalStep = true;
      $finalArg = 100;
    } else {
    }
  } catch ($finalImplicit) {
    $(x);
    throw $finalImplicit;
  }
  $(x);
  if ($finalStep) {
    return $finalArg;
  } else {
    return undefined;
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
  let d = undefined;
  try {
    const e = $();
    if (e) {
      b = 2;
      c = true;
      d = 100;
    }
  }
  catch (f) {
    $( b );
    throw f;
  }
  $( b );
  if (c) {
    return d;
  }
  else {
    return undefined;
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
