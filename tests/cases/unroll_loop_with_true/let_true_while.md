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

## Output

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
