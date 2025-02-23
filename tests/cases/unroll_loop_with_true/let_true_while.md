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
let tmp /*:boolean*/ = true;
const test /*:unknown*/ = $(`first`);
$(`second`);
if (test) {
} else {
  $(`third`);
  while ($LOOP_UNROLL_10) {
    const test$1 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$1) {
      tmp = false;
    } else {
      $(`third`);
    }
    if (tmp) {
    } else {
      break;
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( "first" );
$( "second" );
if (b) {

}
else {
  $( "third" );
  while ($LOOP_UNROLL_10) {
    const c = $( "first" );
    $( "second" );
    if (c) {
      a = false;
    }
    else {
      $( "third" );
    }
    if (a) {

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
