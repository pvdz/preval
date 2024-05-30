# Preval test case

# try_catch_finally.md

> Unroll loop with true > Try catch finally
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
  try {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
  } catch (e) {
    $('error', e);
  } finally {
    $('finally');
  }
}
`````

## Pre Normal

`````js filename=intro
while (true) {
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        const test = $(`first`);
        $(`second`);
        if (test) {
          {
            $finalStep = true;
            break $finally;
          }
        } else {
          $(`third`);
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      $(`finally`);
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      break;
    }
  }
}
`````

## Normalized

`````js filename=intro
while (true) {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      const test = $(`first`);
      $(`second`);
      if (test) {
        $finalStep = true;
        break $finally;
      } else {
        $(`third`);
      }
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(`finally`);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      break;
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
let $implicitThrow = false;
let $finalStep = false;
let $finalCatchArg = undefined;
try {
  const test = $(`first`);
  $(`second`);
  if (test) {
    $finalStep = true;
  } else {
    $(`third`);
  }
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(`finally`);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  if ($finalStep) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      let $implicitThrow$1 = false;
      let $finalStep$1 = false;
      let $finalCatchArg$1 = undefined;
      try {
        const test$1 = $(`first`);
        $(`second`);
        if (test$1) {
          $finalStep$1 = true;
        } else {
          $(`third`);
        }
      } catch ($finalImplicit$1) {
        $implicitThrow$1 = true;
        $finalCatchArg$1 = $finalImplicit$1;
      }
      $(`finally`);
      if ($implicitThrow$1) {
        throw $finalCatchArg$1;
      } else {
        if ($finalStep$1) {
          break;
        } else {
        }
      }
    }
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
let b = false;
let c = false;
let d = undefined;
try {
  const e = $( "first" );
  $( "second" );
  if (e) {
    c = true;
  }
  else {
    $( "third" );
  }
}
catch ($finalImplicit) {
  b = true;
  d = $finalImplicit;
}
$( "finally" );
if (b) {
  throw d;
}
else {
  if (c) {
    a = false;
  }
  if (a) {
    while ($LOOP_UNROLL_10) {
      let f = false;
      let g = false;
      let h = undefined;
      try {
        const i = $( "first" );
        $( "second" );
        if (i) {
          g = true;
        }
        else {
          $( "third" );
        }
      }
catch ($finalImplicit$1) {
        f = true;
        h = $finalImplicit$1;
      }
      $( "finally" );
      if (f) {
        throw h;
      }
      else {
        if (g) {
          break;
        }
      }
    }
  }
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

$finalImplicit, $finalImplicit$1

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
