# Preval test case

# const_test_true.md

> While > Const test true
>
> A test that is a constant only needs to be tested once

#TODO

## Input

`````js filename=intro
const x = $(true);
while (x) {
  $('body');
}
$('after');
`````

## Pre Normal

`````js filename=intro
const x = $(true);
while (x) {
  $('body');
}
$('after');
`````

## Normalized

`````js filename=intro
const x = $(true);
while (x) {
  $('body');
}
$('after');
`````

## Output

`````js filename=intro
const x = $(true);
if (x) {
  while (true) {
    $('body');
  }
} else {
}
$('after');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'body'
 - 3: 'body'
 - 4: 'body'
 - 5: 'body'
 - 6: 'body'
 - 7: 'body'
 - 8: 'body'
 - 9: 'body'
 - 10: 'body'
 - 11: 'body'
 - 12: 'body'
 - 13: 'body'
 - 14: 'body'
 - 15: 'body'
 - 16: 'body'
 - 17: 'body'
 - 18: 'body'
 - 19: 'body'
 - 20: 'body'
 - 21: 'body'
 - 22: 'body'
 - 23: 'body'
 - 24: 'body'
 - 25: 'body'
 - 26: 'body'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same