# Preval test case

# arr_as_computed_prop.md

> Try escaping > Arr as computed prop
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
const obj = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(obj[arr]);
    arr.reverse();
    if (arr[0] === $) break;
  } catch {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
const obj = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(obj[arr]);
    arr.reverse();
    if (arr[0] === $) break;
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const obj = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCallCallee = $;
    const tmpCalleeParam = obj[arr];
    tmpCallCallee(tmpCalleeParam);
    arr.reverse();
    const tmpBinLhs = arr[0];
    const tmpIfTest = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const obj /*:object*/ = {};
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam = obj[arr];
    $(tmpCalleeParam);
    arr.reverse();
    const tmpBinLhs = arr[0];
    const tmpIfTest /*:boolean*/ = tmpBinLhs === $;
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const c = a[ b ];
    $( c );
    b.reverse();
    const d = b[ 0 ];
    const e = d === $;
    if (e) {
      break;
    }
  }
  catch (f) {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - 7: undefined
 - 8: undefined
 - 9: undefined
 - 10: undefined
 - 11: undefined
 - 12: undefined
 - 13: undefined
 - 14: undefined
 - 15: undefined
 - 16: undefined
 - 17: undefined
 - 18: undefined
 - 19: undefined
 - 20: undefined
 - 21: undefined
 - 22: undefined
 - 23: undefined
 - 24: undefined
 - 25: undefined
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
