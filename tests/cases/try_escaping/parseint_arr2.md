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
const tmpFree /*:(unknown)=>number*/ = function $free($$0) {
  const a = $$0;
  debugger;
  const b /*:number*/ = parseInt(a);
  const tmpRet /*:number*/ = b / 1;
  return tmpRet;
};
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a$1 /*:primitive*/ = arr[2];
  $(a$1);
  const c /*:number*/ = $frfr(tmpFree, a$1);
  if (c) {
    break;
  } else {
    const M = arr.shift();
    arr.push(M);
  }
}
const tmpCalleeParam /*:primitive*/ = arr[1];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = d;
  debugger;
  const e = parseInt( c );
  const f = e / 1;
  return f;
};
const g = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const h = g[ 2 ];
  $( h );
  const i = j( a, h );
  if (i) {
    break;
  }
  else {
    const k = g.shift();
    g.push( k );
  }
}
const l = g[ 1 ];
$( l );
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
