# Preval test case

# parseint_arr2.md

> Try escaping > Parseint arr2
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_NO_UNROLLS_LEFT) {
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
const tmpFree /*:(string)=>number*/ = function $free($$0) {
  const a /*:string*/ = $$0;
  debugger;
  const b /*:number*/ = $Number_parseInt(a);
  const tmpRet /*:number*/ = b / 1;
  return tmpRet;
};
const arr /*:array*/ /*truthy*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_NO_UNROLLS_LEFT) {
  const a$1 /*:string*/ = arr[2];
  $(a$1);
  const c /*:number*/ = $frfr(tmpFree, a$1);
  if (c) {
    break;
  } else {
    const M /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, M);
  }
}
const tmpCalleeParam /*:string*/ = arr[1];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(a) {
  const tmpRet = $Number_parseInt(a) / 1;
  return tmpRet;
};
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const a$1 = arr[2];
  $(a$1);
  if (tmpFree(a$1)) {
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
$(arr[1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = $Number_parseInt( b );
  const d = c / 1;
  return d;
};
const e = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const f = e[ 2 ];
  $( f );
  const g = h( a, f );
  if (g) {
    break;
  }
  else {
    const i = $dotCall( $array_shift, e, "shift" );
    $dotCall( $array_push, e, "push", i );
  }
}
const j = e[ 1 ];
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = arr[2];
  $(a);
  try {
    const b = $Number_parseInt(a);
    const c = b / 1;
    if (c) {
      break;
    } else {
      const tmpMCF = arr.shift;
      const M = $dotCall(tmpMCF, arr, `shift`);
      const tmpMCF$1 = arr.push;
      $dotCall(tmpMCF$1, arr, `push`, M);
    }
  } catch (P) {
    $(`fail`);
  }
}
let tmpCalleeParam = arr[1];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) type trackeed tricks can possibly support static $Number_parseInt


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
