# Preval test case

# const_test_false.md

> While > Const test false
>
> A test that is a constant only needs to be tested once

#TODO

## Input

`````js filename=intro
const x = $(false);
while (x) {
  $('body');
}
$('after');
`````

## Pre Normal

`````js filename=intro
const x = $(false);
while (x) {
  $(`body`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
const x = $(false);
while (x) {
  $(`body`);
}
$(`after`);
`````

## Output

`````js filename=intro
const x = $(false);
if (x) {
  while (true) {
    $(`body`);
  }
} else {
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
