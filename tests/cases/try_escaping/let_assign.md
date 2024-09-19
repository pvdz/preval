# Preval test case

# let_assign.md

> Try escaping > Let assign
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = undefined;
let y = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    x = arr;
    arr.reverse();
    y = [5, 6]; // <-- this is the line being checked
    if (y === $) break;
  } catch {
    $('fail');
  }
}
$(x, y);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
let x = undefined;
let y = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    x = arr;
    arr.reverse();
    y = [5, 6];
    if (y === $) break;
  } catch (e) {
    $(`fail`);
  }
}
$(x, y);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
let x = undefined;
let y = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCallCallee = $;
    const tmpCalleeParam = arr[0];
    tmpCallCallee(tmpCalleeParam);
    x = arr;
    arr.reverse();
    y = [5, 6];
    const tmpIfTest = y === $;
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (e) {
    $(`fail`);
  }
}
$(x, y);
`````

## Output


`````js filename=intro
let x = undefined;
let y = 1;
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam = arr[0];
  try {
    $(tmpCalleeParam);
    x = arr;
    arr.reverse();
    y = [5, 6];
    const tmpIfTest /*:boolean*/ = y === $;
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (e) {
    $(`fail`);
  }
}
$(x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = 1;
const c = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c[ 0 ];
  try {
    $( d );
    a = c;
    c.reverse();
    b = [ 5, 6 ];
    const e = b === $;
    if (e) {
      break;
    }
  }
  catch (f) {
    $( "fail" );
  }
}
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 3
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 3
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
