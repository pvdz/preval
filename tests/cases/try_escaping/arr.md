# Preval test case

# arr.md

> Try escaping > Arr
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
      if (a) {
        break;
      } else {
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      const N = arr.shift();
      arr.push(N);
    }
  }
  $(arr);
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
      if (a) {
        break;
      } else {
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      const N = arr.shift();
      arr.push(N);
    }
  }
  $(arr);
}
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCallCallee = $;
  const tmpCalleeParam = arr[0];
  tmpCallCallee(tmpCalleeParam);
  try {
    const a = arr[286];
    if (a) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}
$(arr);
`````

## Output


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  const a = arr[286];
  if (a) {
    break;
  } else {
    const M = arr.shift();
    arr.push(M);
  }
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = a[ 286 ];
  if (c) {
    break;
  }
  else {
    const d = a.shift();
    a.push( d );
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 'f'
 - 7: 'g'
 - 8: 'h'
 - 9: 'i'
 - 10: 'j'
 - 11: 'k'
 - 12: 'a'
 - 13: 'b'
 - 14: 'c'
 - 15: 'd'
 - 16: 'e'
 - 17: 'f'
 - 18: 'g'
 - 19: 'h'
 - 20: 'i'
 - 21: 'j'
 - 22: 'k'
 - 23: 'a'
 - 24: 'b'
 - 25: 'c'
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
