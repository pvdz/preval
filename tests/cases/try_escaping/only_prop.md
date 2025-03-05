# Preval test case

# only_prop.md

> Try escaping > Only prop
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(arr[0]);
    try {
      const a = arr[286];
      $(a);
    } catch (P) {
      $('fail');
    }
  }
}
`````

## Pre Normal


`````js filename=intro
{
  const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(arr[0]);
    try {
      const a = arr[286];
      $(a);
    } catch (P) {
      $(`fail`);
    }
  }
}
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  try {
    const a = arr[286];
    $(a);
  } catch (P) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`a`);
  try {
    $(undefined);
  } catch (P) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "a" );
  try {
    $( undefined );
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
 - 1: 'a'
 - 2: undefined
 - 3: 'a'
 - 4: undefined
 - 5: 'a'
 - 6: undefined
 - 7: 'a'
 - 8: undefined
 - 9: 'a'
 - 10: undefined
 - 11: 'a'
 - 12: undefined
 - 13: 'a'
 - 14: undefined
 - 15: 'a'
 - 16: undefined
 - 17: 'a'
 - 18: undefined
 - 19: 'a'
 - 20: undefined
 - 21: 'a'
 - 22: undefined
 - 23: 'a'
 - 24: undefined
 - 25: 'a'
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
