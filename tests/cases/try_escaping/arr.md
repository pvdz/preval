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


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:primitive*/ = arr[0];
  $(tmpCalleeParam);
  const a /*:primitive*/ = arr[286];
  if (a) {
    break;
  } else {
    const M /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, M);
  }
}
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  $(arr[0]);
  if (arr[286]) {
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
$(arr);
`````


## PST Settled
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
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  try {
    const a = arr[286];
    if (a) {
      break;
    } else {
      const tmpMCF = arr.shift;
      const M = $dotCall(tmpMCF, arr, `shift`);
      const tmpMCF$1 = arr.push;
      $dotCall(tmpMCF$1, arr, `push`, M);
    }
  } catch (P) {
    const tmpMCF$3 = arr.shift;
    const N = $dotCall(tmpMCF$3, arr, `shift`);
    const tmpMCF$5 = arr.push;
    $dotCall(tmpMCF$5, arr, `push`, N);
  }
}
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
