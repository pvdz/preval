# Preval test case

# parseint_arr4.md

> Try escaping > Parseint arr4
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
  const arr /*:array*/ = [ `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k` ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[0];
  $(x);
  try {
    if (x) {
      const el /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, el);
    } else {
      break;
    }
  } catch (e) {
    $(`keepme`);
  }
}
const tmpCalleeParam /*:primitive*/ = arr[0];
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[0];
  $(x);
  if (x) {
    const el /*:primitive*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, el);
  } else {
    break;
  }
}
const tmpCalleeParam /*:primitive*/ = arr[0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const x = arr[0];
  $(x);
  if (x) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  } else {
    break;
  }
}
$(arr[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  if (b) {
    const c = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", c );
  }
  else {
    break;
  }
}
const d = a[ 0 ];
$( d );
`````


## Todos triggered


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
