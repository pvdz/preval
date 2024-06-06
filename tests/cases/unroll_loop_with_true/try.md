# Preval test case

# try.md

> Unroll loop with true > Try
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
  } catch (e) {
    $(`error`, e);
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
} catch (e) {
  $(`error`, e);
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
    } catch (e$1) {
      $(`error`, e$1);
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
  const b = $( "first" );
  $( "second" );
  if (b) {
    a = false;
  }
  else {
    $( "third" );
  }
}
catch (c) {
  $( "error", c );
}
if (a) {
  while ($LOOP_UNROLL_10) {
    try {
      const d = $( "first" );
      $( "second" );
      if (d) {
        break;
      }
      else {
        $( "third" );
      }
    }
catch (e) {
      $( "error", e );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
