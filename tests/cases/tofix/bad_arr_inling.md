# Preval test case

# bad_arr_inling.md

> Tofix > Bad arr inling
>
> At the time of writing a trick would inline obj[arr] as a string 
> even though .reverse() will change it later.

## Input

`````js filename=intro
const arr = [1, 2, 3];
const obj = {'1,2,3': 'pass'}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(obj[arr]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
const obj = { [`1,2,3`]: `pass` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(obj[arr]);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const obj = { [`1,2,3`]: `pass` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCallCallee = $;
    const tmpCalleeParam = obj[arr];
    tmpCallCallee(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const arr = [1, 2, 3];
const obj = { [`1,2,3`]: `pass` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam = obj[`1,2,3`];
    $(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = { [ "1,2,3" ]: "pass" };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const c = b[ "1,2,3" ];
    $( c );
    a.reverse();
  }
  catch (d) {
    $( "fail" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: undefined
 - 3: 'pass'
 - 4: undefined
 - 5: 'pass'
 - 6: undefined
 - 7: 'pass'
 - 8: undefined
 - 9: 'pass'
 - 10: undefined
 - 11: 'pass'
 - 12: undefined
 - 13: 'pass'
 - 14: undefined
 - 15: 'pass'
 - 16: undefined
 - 17: 'pass'
 - 18: undefined
 - 19: 'pass'
 - 20: undefined
 - 21: 'pass'
 - 22: undefined
 - 23: 'pass'
 - 24: undefined
 - 25: 'pass'
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'pass'
 - 2: 'pass'
 - 3: 'pass'
 - 4: 'pass'
 - 5: 'pass'
 - 6: 'pass'
 - 7: 'pass'
 - 8: 'pass'
 - 9: 'pass'
 - 10: 'pass'
 - 11: 'pass'
 - 12: 'pass'
 - 13: 'pass'
 - 14: 'pass'
 - 15: 'pass'
 - 16: 'pass'
 - 17: 'pass'
 - 18: 'pass'
 - 19: 'pass'
 - 20: 'pass'
 - 21: 'pass'
 - 22: 'pass'
 - 23: 'pass'
 - 24: 'pass'
 - 25: 'pass'
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')
