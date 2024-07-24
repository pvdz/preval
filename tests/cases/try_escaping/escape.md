# Preval test case

# escape.md

> Try escaping > Escape
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const x = arr[1];
      $(x);
      globalish = arr;
      if ($()) {
        break;
      } else {
        
      }
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
    try {
      const x = arr[1];
      $(x);
      globalish = arr;
      if ($()) {
        break;
      } else {
      }
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
  try {
    const x = arr[1];
    $(x);
    globalish = arr;
    const tmpIfTest = $();
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (P) {
    $(`fail`);
  }
}
`````

## Output


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[1];
  try {
    $(x);
    globalish = arr;
    const tmpIfTest = $();
    if (tmpIfTest) {
      break;
    } else {
    }
  } catch (P) {
    $(`fail`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 1 ];
  try {
    $( b );
    globalish = a;
    const c = $();
    if (c) {
      break;
    }
  }
  catch (d) {
    $( "fail" );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

globalish

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'fail'
 - 3: 'b'
 - 4: 'fail'
 - 5: 'b'
 - 6: 'fail'
 - 7: 'b'
 - 8: 'fail'
 - 9: 'b'
 - 10: 'fail'
 - 11: 'b'
 - 12: 'fail'
 - 13: 'b'
 - 14: 'fail'
 - 15: 'b'
 - 16: 'fail'
 - 17: 'b'
 - 18: 'fail'
 - 19: 'b'
 - 20: 'fail'
 - 21: 'b'
 - 22: 'fail'
 - 23: 'b'
 - 24: 'fail'
 - 25: 'b'
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
