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
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      break;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`, e);
  } finally {
    $(`finally`);
  }
}
`````

## Normalized

`````js filename=intro
while (true) {
  try {
    try {
      const test = $(`first`);
      $(`second`);
      if (test) {
        break;
      } else {
        $(`third`);
      }
    } catch (e) {
      $(`error`, e);
    }
  } finally {
    $(`finally`);
  }
}
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
try {
  try {
    const test = $(`first`);
    $(`second`);
    if (test) {
      $tmpLoopUnrollCheck = false;
    } else {
      $(`third`);
    }
  } catch (e) {
    $(`error`, e);
  }
} finally {
  $(`finally`);
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    try {
      try {
        const test$1 = $(`first`);
        $(`second`);
        if (test$1) {
          break;
        } else {
          $(`third`);
        }
      } catch (e$1) {
        $(`error`, e$1);
      }
    } finally {
      $(`finally`);
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
try {
  try {
    const b = $( "first" );
    $( "second" );
    if (b) {
      a = false;
    }
    else {
      $( "third" );
    }
  }
catch (e) {
    $( "error", e );
  }
}
finally {
  $( "finally" );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    try {
      try {
        const c = $( "first" );
        $( "second" );
        if (c) {
          break;
        }
        else {
          $( "third" );
        }
      }
catch (e$1) {
        $( "error", e$1 );
      }
    }
finally {
      $( "finally" );
    }
  }
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

e, e$1

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'finally'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
