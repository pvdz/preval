# Preval test case

# let.md

> Try escaping > Let
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
let arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.reverse();
    if (arr[0] === $) break;
    arr = [1,2,3];
  } catch {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
let arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.reverse();
    if (arr[0] === $) break;
    arr = [1, 2, 3];
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
let arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCallCallee = $;
    const tmpCalleeParam = arr[0];
    tmpCallCallee(tmpCalleeParam);
    arr.reverse();
    const tmpBinLhs = arr[0];
    const tmpIfTest = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
      arr = [1, 2, 3];
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
let arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam = arr[0];
  try {
    $(tmpCalleeParam);
    arr.reverse();
    const tmpBinLhs = arr[0];
    const tmpIfTest /*:boolean*/ = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
      arr = [1, 2, 3];
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  try {
    $( b );
    a.reverse();
    const c = a[ 0 ];
    const d = c === $;
    if (d) {
      break;
    }
    else {
      a = [ 1, 2, 3 ];
    }
  }
  catch (e) {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
