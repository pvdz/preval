# Preval test case

# base.md

> Unroll loop with true > Base
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
const test /*:unknown*/ = $(`first`);
$(`second`);
if (test) {
} else {
  while ($LOOP_UNROLL_10) {
    $(`third`);
    const test$1 /*:unknown*/ = $(`first`);
    $(`second`);
    if (test$1) {
      break;
    } else {
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
if (a) {

}
else {
  while ($LOOP_UNROLL_10) {
    $( "third" );
    const b = $( "first" );
    $( "second" );
    if (b) {
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
