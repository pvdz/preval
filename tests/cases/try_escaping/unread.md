# Preval test case

# unread.md

> Try escaping > Unread
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $('ok');
  } catch {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(`ok`);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(`ok`);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(`ok`);
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $( "ok" );
  }
  catch (a) {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - 2: 'ok'
 - 3: 'ok'
 - 4: 'ok'
 - 5: 'ok'
 - 6: 'ok'
 - 7: 'ok'
 - 8: 'ok'
 - 9: 'ok'
 - 10: 'ok'
 - 11: 'ok'
 - 12: 'ok'
 - 13: 'ok'
 - 14: 'ok'
 - 15: 'ok'
 - 16: 'ok'
 - 17: 'ok'
 - 18: 'ok'
 - 19: 'ok'
 - 20: 'ok'
 - 21: 'ok'
 - 22: 'ok'
 - 23: 'ok'
 - 24: 'ok'
 - 25: 'ok'
 - 26: 'ok'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
