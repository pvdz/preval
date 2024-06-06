# Preval test case

# break.md

> Unroll loop with true > Break
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else {
      $('third');
    }
}
`````

## Pre Normal


`````js filename=intro
while (true) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    break;
  } else {
    $(`third`);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    break;
  } else {
    $(`third`);
  }
}
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const test = $(`first`);
$(`second`);
if (test) {
  $tmpLoopUnrollCheck = false;
} else {
  $(`third`);
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const test$1 = $(`first`);
    $(`second`);
    if (test$1) {
      break;
    } else {
      $(`third`);
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
if (a) {
  while ($LOOP_UNROLL_10) {
    const c = $( "first" );
    $( "second" );
    if (c) {
      break;
    }
    else {
      $( "third" );
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
