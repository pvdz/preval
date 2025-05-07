# Preval test case

# parseint_arr.md

> Try escaping > Parseint arr
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[0]; // We can detect the type as string (or primitive) and assert not observable
  $(x);
  try {
    const y = parseInt(x); // Cannot throw without second arg so move it up
    if (y) {
      const el = arr.shift();
      arr.push(el);
    } else {

    }
  } catch (e) {
    $('keepme');
  }
}
$(arr[0]);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[0];
  $(x);
  const y /*:number*/ = $Number_parseInt(x);
  if (y) {
    const el /*:primitive*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, el);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const x = arr[0];
  $(x);
  if ($Number_parseInt(x)) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = $Number_parseInt( b );
  if (c) {
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'a'
 - 4: 'a'
 - 5: 'a'
 - 6: 'a'
 - 7: 'a'
 - 8: 'a'
 - 9: 'a'
 - 10: 'a'
 - 11: 'a'
 - 12: 'a'
 - 13: 'a'
 - 14: 'a'
 - 15: 'a'
 - 16: 'a'
 - 17: 'a'
 - 18: 'a'
 - 19: 'a'
 - 20: 'a'
 - 21: 'a'
 - 22: 'a'
 - 23: 'a'
 - 24: 'a'
 - 25: 'a'
 - 26: 'a'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
