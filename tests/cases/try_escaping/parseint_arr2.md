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


## Settled


`````js filename=intro
const tmpFree /*:(primitive)=>number*/ = function $free($$0) {
  const a /*:primitive*/ = $$0;
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
    const M /*:unknown*/ = arr.shift();
    arr.push(M);
  }
}
const tmpCalleeParam /*:primitive*/ = arr[1];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(a) {
  const tmpRet = parseInt(a) / 1;
  return tmpRet;
};
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const a$1 = arr[2];
  $(a$1);
  if ($frfr(tmpFree, a$1)) {
    break;
  } else {
    arr.push(arr.shift());
  }
}
$(arr[1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = parseInt( c );
  const e = d / 1;
  return e;
};
const f = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = f[ 2 ];
  $( g );
  const h = i( a, g );
  if (h) {
    break;
  }
  else {
    const j = f.shift();
    f.push( j );
  }
}
const k = f[ 1 ];
$( k );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
