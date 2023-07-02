# Preval test case

# try_catch_short_finally.md

> Unroll loop with true > Try catch short finally
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
  } catch {
    $('error');
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
  } catch {
    $(`error`);
  } finally {
    $(`finally`);
  }
}
`````

## Normalized

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
  } catch {
    $(`error`);
  } finally {
    $(`finally`);
  }
}
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
try {
  const test = $(`first`);
  $(`second`);
  if (test) {
    $tmpLoopUnrollCheck = false;
  } else {
    $(`third`);
  }
} catch {
  $(`error`);
} finally {
  $(`finally`);
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    try {
      const test$1 = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        $(`third`);
      }
    } catch {
      $(`error`);
    } finally {
      $(`finally`);
    }
  }
} else {
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
