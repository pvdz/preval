# Preval test case

# throw2.md

> Try escaping > Throw2
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr = $;
    $(arr[0]);
    arr.reverse();
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
    arr = $;
    $(arr[0]);
    arr.reverse();
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
    arr = $;
    const tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    throw `Preval: Cannot write to const binding \`arr\``;
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
    throw "Preval: Cannot write to const binding `arr`";
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
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'fail'
 - 4: 'fail'
 - 5: 'fail'
 - 6: 'fail'
 - 7: 'fail'
 - 8: 'fail'
 - 9: 'fail'
 - 10: 'fail'
 - 11: 'fail'
 - 12: 'fail'
 - 13: 'fail'
 - 14: 'fail'
 - 15: 'fail'
 - 16: 'fail'
 - 17: 'fail'
 - 18: 'fail'
 - 19: 'fail'
 - 20: 'fail'
 - 21: 'fail'
 - 22: 'fail'
 - 23: 'fail'
 - 24: 'fail'
 - 25: 'fail'
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Support this node type in isFree: ThrowStatement