# Preval test case

# arr_loop_case.md

> Arr mutation > Arr loop case
>
>

## Input

`````js filename=intro
const arr = [
  `one`,
  `two`,
  `three`,
  `four`,
  `five`,
];
while (true) {
  $(1);
  try {
    const test = arr[2] === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      $(arr.slice(0));
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
}

$(arr.slice(0, 3));
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [`one`, `two`, `three`, `four`, `five`];
while ($LOOP_NO_UNROLLS_LEFT) {
  $(1);
  const next /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
  $dotCall($array_push, arr, `push`, next);
  const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
  try {
    $(tmpCalleeParam);
  } catch (e) {
    const v /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, v);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  const tmpCalleeParam = $dotCall($array_slice, arr, `slice`, 0);
  try {
    $(tmpCalleeParam);
  } catch (e) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "one", "two", "three", "four", "five" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  $( 1 );
  const b = $dotCall( $array_shift, a, "shift" );
  $dotCall( $array_push, a, "push", b );
  const c = $dotCall( $array_slice, a, "slice", 0 );
  try {
    $( c );
  }
  catch (d) {
    const e = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", e );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  try {
    const tmpBinLhs = arr[2];
    const test = tmpBinLhs === 820304;
    if (test) {
      break;
    } else {
      const tmpMCF = arr.shift;
      const next = $dotCall(tmpMCF, arr, `shift`);
      const tmpMCF$1 = arr.push;
      $dotCall(tmpMCF$1, arr, `push`, next);
      const tmpMCF$3 = arr.slice;
      let tmpCalleeParam = $dotCall(tmpMCF$3, arr, `slice`, 0);
      $(tmpCalleeParam);
    }
  } catch (e) {
    const tmpMCF$5 = arr.shift;
    const v = $dotCall(tmpMCF$5, arr, `shift`);
    const tmpMCF$7 = arr.push;
    $dotCall(tmpMCF$7, arr, `push`, v);
  }
}
const tmpMCF$9 = arr.slice;
let tmpCalleeParam$1 = $dotCall(tmpMCF$9, arr, `slice`, 0, 3);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_slice
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) phase1_1 support this array method call? $array_slice
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['two', 'three', 'four', 'five', 'one']
 - 3: 1
 - 4: ['three', 'four', 'five', 'one', 'two']
 - 5: 1
 - 6: ['four', 'five', 'one', 'two', 'three']
 - 7: 1
 - 8: ['five', 'one', 'two', 'three', 'four']
 - 9: 1
 - 10: ['one', 'two', 'three', 'four', 'five']
 - 11: 1
 - 12: ['two', 'three', 'four', 'five', 'one']
 - 13: 1
 - 14: ['three', 'four', 'five', 'one', 'two']
 - 15: 1
 - 16: ['four', 'five', 'one', 'two', 'three']
 - 17: 1
 - 18: ['five', 'one', 'two', 'three', 'four']
 - 19: 1
 - 20: ['one', 'two', 'three', 'four', 'five']
 - 21: 1
 - 22: ['two', 'three', 'four', 'five', 'one']
 - 23: 1
 - 24: ['three', 'four', 'five', 'one', 'two']
 - 25: 1
 - 26: ['four', 'five', 'one', 'two', 'three']
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
