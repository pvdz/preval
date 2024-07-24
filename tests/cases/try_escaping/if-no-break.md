# Preval test case

# if-no-break.md

> Try escaping > If-no-break
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  try {
    if (x) ;
    else break;
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
  const x = $(1);
  try {
    if (x);
    else break;
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
  const x = $(1);
  try {
    if (x) {
      const tmpCallCallee = $;
      const tmpCalleeParam = arr[0];
      tmpCallCallee(tmpCalleeParam);
      arr.reverse();
    } else {
      break;
    }
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $(1);
  if (x) {
    const tmpCalleeParam = arr[0];
    try {
      $(tmpCalleeParam);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( 1 );
  if (b) {
    const c = a[ 0 ];
    try {
      $( c );
      a.reverse();
    }
    catch (d) {
      $( "fail" );
    }
  }
  else {
    break;
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
 - 4: 3
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
