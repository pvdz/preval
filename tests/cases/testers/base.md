# Preval test case

# base.md

> Testers > Base
>
> A binding only used in a test situation is not observed so we can replace booly values where we can assert the bool with an actual bool.

#TODO

## Input

`````js filename=intro
let x = "foo";
// The loops makes it impossible to collapse the whole thing
while (true) {
  if (x) {
    x = null;
    $('first');
  } else {
    $('nexts');
  }
}
`````

## Pre Normal

`````js filename=intro
let x = `foo`;
while (true) {
  if (x) {
    x = null;
    $(`first`);
  } else {
    $(`nexts`);
  }
}
`````

## Normalized

`````js filename=intro
let x = `foo`;
while (true) {
  if (x) {
    x = null;
    $(`first`);
  } else {
    $(`nexts`);
  }
}
`````

## Output

`````js filename=intro
$(`first`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
$(`nexts`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`nexts`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'nexts'
 - 3: 'nexts'
 - 4: 'nexts'
 - 5: 'nexts'
 - 6: 'nexts'
 - 7: 'nexts'
 - 8: 'nexts'
 - 9: 'nexts'
 - 10: 'nexts'
 - 11: 'nexts'
 - 12: 'nexts'
 - 13: 'nexts'
 - 14: 'nexts'
 - 15: 'nexts'
 - 16: 'nexts'
 - 17: 'nexts'
 - 18: 'nexts'
 - 19: 'nexts'
 - 20: 'nexts'
 - 21: 'nexts'
 - 22: 'nexts'
 - 23: 'nexts'
 - 24: 'nexts'
 - 25: 'nexts'
 - 26: 'nexts'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
