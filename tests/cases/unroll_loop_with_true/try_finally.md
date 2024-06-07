# Preval test case

# try_finally.md

> Unroll loop with true > Try finally
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
        $(`finally`);
        throw $finalImplicit;
      }
    }
    {
      $(`finally`);
    }
    if ($implicitThrow) throw $finalCatchArg;
    else if ($finalStep) break;
    else {
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
      $(`finally`);
      throw $finalImplicit;
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
let $finalStep = false;
try {
  const test = $(`first`);
  $(`second`);
  if (test) {
    $finalStep = true;
  } else {
    $(`third`);
  }
} catch ($finalImplicit) {
  $(`finally`);
  throw $finalImplicit;
}
$(`finally`);
if ($finalStep) {
  $tmpLoopUnrollCheck = false;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    let $finalStep$1 = false;
    try {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        $finalStep$1 = true;
      } else {
        $(`third`);
      }
    } catch ($finalImplicit$1) {
      $(`finally`);
      throw $finalImplicit$1;
    }
    $(`finally`);
    if ($finalStep$1) {
      break;
    } else {
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
let b = false;
try {
  const c = $( "first" );
  $( "second" );
  if (c) {
    b = true;
  }
  else {
    $( "third" );
  }
}
catch (d) {
  $( "finally" );
  throw d;
}
$( "finally" );
if (b) {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    let e = false;
    try {
      const f = $( "first" );
      $( "second" );
      if (f) {
        e = true;
      }
      else {
        $( "third" );
      }
    }
catch (g) {
      $( "finally" );
      throw g;
    }
    $( "finally" );
    if (e) {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
