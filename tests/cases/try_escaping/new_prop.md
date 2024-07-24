# Preval test case

# new_prop.md

> Try escaping > New prop
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr.reverse();
    $(arr[0]);
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
    arr.reverse();
    $(arr[0]);
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
    arr.reverse();
    const tmpCallCallee = $;
    const tmpCalleeParam = arr[0];
    tmpCallCallee(tmpCalleeParam);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr.reverse();
    const tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    a.reverse();
    const b = a[ 0 ];
    $( b );
  }
  catch (c) {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 3
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 3
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
