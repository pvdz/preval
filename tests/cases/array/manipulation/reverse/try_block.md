# Preval test case

# try_block.md

> Array > Manipulation > Reverse > Try block
>
> It shouldn't apply the trick in a loop or try when the decl is outside that 
> loop or try because the mutation is unpredictable (contrived cases aside)

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
    const tmpCalleeParam = obj[arr];
    $(tmpCalleeParam);
    arr.reverse();
  } catch (e) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const obj /*:object*/ = { [`1,2,3`]: `pass` };
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam /*:unknown*/ = obj[arr];
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
const a = { [ "1,2,3" ]: "pass" };
const b = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const c = a[ b ];
    $( c );
    b.reverse();
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

Final output calls: Same

Todos triggered:
- objects in isFree check
- computed property access of an ident on a non-number feels tricky;