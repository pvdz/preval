# Preval test case

# parseint_arr2.md

> Try escaping > Parseint arr2
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const a = arr[2];
    $(a);
    try {
      const b = parseInt(a);
      const c = b / 1;
      if (c) {
        break;
      } else {
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      $('fail');
    }
  }
  $(arr[1]);
}
`````

## Pre Normal


`````js filename=intro
{
  const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const a = arr[2];
    $(a);
    try {
      const b = parseInt(a);
      const c = b / 1;
      if (c) {
        break;
      } else {
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      $(`fail`);
    }
  }
  $(arr[1]);
}
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = arr[2];
  $(a);
  try {
    const b = parseInt(a);
    const c = b / 1;
    if (c) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    $(`fail`);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = arr[1];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = arr[2];
  $(a);
  const b = parseInt(a);
  const c = b / 1;
  if (c) {
    break;
  } else {
    const M = arr.shift();
    arr.push(M);
  }
}
const tmpCalleeParam = arr[1];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 2 ];
  $( b );
  const c = parseInt( b );
  const d = c / 1;
  if (d) {
    break;
  }
  else {
    const e = a.shift();
    a.push( e );
  }
}
const f = a[ 1 ];
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 'd'
 - 3: 'e'
 - 4: 'f'
 - 5: 'g'
 - 6: 'h'
 - 7: 'i'
 - 8: 'j'
 - 9: 'k'
 - 10: 'a'
 - 11: 'b'
 - 12: 'c'
 - 13: 'd'
 - 14: 'e'
 - 15: 'f'
 - 16: 'g'
 - 17: 'h'
 - 18: 'i'
 - 19: 'j'
 - 20: 'k'
 - 21: 'a'
 - 22: 'b'
 - 23: 'c'
 - 24: 'd'
 - 25: 'e'
 - 26: 'f'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
