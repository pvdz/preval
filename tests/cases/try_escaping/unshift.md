# Preval test case

# unshift.md

> Try escaping > Unshift
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.unshift($);
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
    $(arr[0]);
    arr.unshift($);
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
    const tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
    arr.unshift($);
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:primitive*/ = arr[0];
  try {
    $(tmpCalleeParam);
    arr.unshift($);
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
  const b = a[ 0 ];
  try {
    $( b );
    a.unshift( $ );
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
 - 1: 1
 - 2: '<$>'
 - 3: '<$>'
 - 4: '<$>'
 - 5: '<$>'
 - 6: '<$>'
 - 7: '<$>'
 - 8: '<$>'
 - 9: '<$>'
 - 10: '<$>'
 - 11: '<$>'
 - 12: '<$>'
 - 13: '<$>'
 - 14: '<$>'
 - 15: '<$>'
 - 16: '<$>'
 - 17: '<$>'
 - 18: '<$>'
 - 19: '<$>'
 - 20: '<$>'
 - 21: '<$>'
 - 22: '<$>'
 - 23: '<$>'
 - 24: '<$>'
 - 25: '<$>'
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_unshift