# Preval test case

# parseint_coerce.md

> Tofix > Parseint coerce
>
> Does parseint always coerce? In that case we could fold the $coerce line. Maybe. Should we?
> from tests/cases/try_escaping/parseint.md

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg = $(`1`);
  const x = $coerce(tmpStringFirstArg, `string`);
  const y = parseInt(x);
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Pre Normal


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg = $(`1`);
  const x = $coerce(tmpStringFirstArg, `string`);
  const y = parseInt(x);
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg = $(`1`);
  const x = $coerce(tmpStringFirstArg, `string`);
  const y = parseInt(x);
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg = $(`1`);
  const x = $coerce(tmpStringFirstArg, `string`);
  const y = parseInt(x);
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( "1" );
  const b = $coerce( a, "string" );
  const c = parseInt( b );
  try {
    $( c );
  }
  catch (d) {
    $( "keepme" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: 1
 - 3: '1'
 - 4: 1
 - 5: '1'
 - 6: 1
 - 7: '1'
 - 8: 1
 - 9: '1'
 - 10: 1
 - 11: '1'
 - 12: 1
 - 13: '1'
 - 14: 1
 - 15: '1'
 - 16: 1
 - 17: '1'
 - 18: 1
 - 19: '1'
 - 20: 1
 - 21: '1'
 - 22: 1
 - 23: '1'
 - 24: 1
 - 25: '1'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
