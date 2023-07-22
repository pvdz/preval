# Preval test case

# let_true_while.md

> Unroll loop with true > Let true while
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
let tmp = true;
while (tmp) {
  const test = $('first');
  $('second');
  if (test) {
    tmp = false;
  } else {
    $('third');
  }
}
`````

## Pre Normal

`````js filename=intro
let tmp = true;
while (tmp) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    tmp = false;
  } else {
    $(`third`);
  }
}
`````

## Normalized

`````js filename=intro
let tmp = true;
while (true) {
  if (tmp) {
    const test = $(`first`);
    $(`second`);
    if (test) {
      tmp = false;
    } else {
      $(`third`);
    }
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmp = true;
const test = $(`first`);
$(`second`);
if (test) {
  tmp = false;
} else {
  $(`third`);
}
let $tmpLoopUnrollCheck = true;
if (tmp) {
  const test$1 = $(`first`);
  $(`second`);
  if (test$1) {
    tmp = false;
  } else {
    $(`third`);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmp) {
      const test$2 = $(`first`);
      $(`second`);
      if (test$2) {
        tmp = false;
      } else {
        $(`third`);
      }
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( "first" );
$( "second" );
if (b) {
  a = false;
}
else {
  $( "third" );
}
let c = true;
if (a) {
  const d = $( "first" );
  $( "second" );
  if (d) {
    a = false;
  }
  else {
    $( "third" );
  }
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      const e = $( "first" );
      $( "second" );
      if (e) {
        a = false;
      }
      else {
        $( "third" );
      }
    }
    else {
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
