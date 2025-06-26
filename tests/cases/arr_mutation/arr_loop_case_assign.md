# Preval test case

# arr_loop_case_assign.md

> Arr mutation > Arr loop case assign
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
  let test;
  try {
    test = arr[2] === 820304;
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
  $(test);
}

$(arr.slice(0, 3));
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`two`, `three`, `four`, `five`, `one`];
const arr /*:array*/ /*truthy*/ = [`two`, `three`, `four`, `five`, `one`];
try {
  $(tmpCalleeParam);
} catch (e) {
  const v /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
  $dotCall($array_push, arr, `push`, v);
}
$(false);
$(1);
const tmpBinLhs$1 /*:primitive*/ = arr[2];
const tmpClusterSSA_test$1 /*:boolean*/ = tmpBinLhs$1 === 820304;
if (tmpClusterSSA_test$1) {
} else {
  const next$1 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
  $dotCall($array_push, arr, `push`, next$1);
  const tmpCalleeParam$2 /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
  try {
    $(tmpCalleeParam$2);
  } catch (e$1) {
    const v$1 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, v$1);
  }
  while ($LOOP_UNROLL_9) {
    $(false);
    $(1);
    const tmpBinLhs$2 /*:primitive*/ = arr[2];
    const tmpClusterSSA_test$2 /*:boolean*/ = tmpBinLhs$2 === 820304;
    if (tmpClusterSSA_test$2) {
      break;
    } else {
      const next$2 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, next$2);
      const tmpCalleeParam$3 /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
      try {
        $(tmpCalleeParam$3);
      } catch (e$2) {
        const v$2 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
        $dotCall($array_push, arr, `push`, v$2);
      }
    }
  }
}
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0, 3);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
const arr = [`two`, `three`, `four`, `five`, `one`];
try {
  $(tmpCalleeParam);
} catch (e) {
  $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
}
$(false);
$(1);
if (!(arr[2] === 820304)) {
  $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  const tmpCalleeParam$2 = $dotCall($array_slice, arr, `slice`, 0);
  try {
    $(tmpCalleeParam$2);
  } catch (e$1) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
  while (true) {
    $(false);
    $(1);
    if (arr[2] === 820304) {
      break;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
      const tmpCalleeParam$3 = $dotCall($array_slice, arr, `slice`, 0);
      try {
        $(tmpCalleeParam$3);
      } catch (e$2) {
        $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
      }
    }
  }
}
$($dotCall($array_slice, arr, `slice`, 0, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = [ "two", "three", "four", "five", "one" ];
const b = [ "two", "three", "four", "five", "one" ];
try {
  $( a );
}
catch (c) {
  const d = $dotCall( $array_shift, b, "shift" );
  $dotCall( $array_push, b, "push", d );
}
$( false );
$( 1 );
const e = b[ 2 ];
const f = e === 820304;
if (f) {

}
else {
  const g = $dotCall( $array_shift, b, "shift" );
  $dotCall( $array_push, b, "push", g );
  const h = $dotCall( $array_slice, b, "slice", 0 );
  try {
    $( h );
  }
  catch (i) {
    const j = $dotCall( $array_shift, b, "shift" );
    $dotCall( $array_push, b, "push", j );
  }
  while ($LOOP_UNROLL_9) {
    $( false );
    $( 1 );
    const k = b[ 2 ];
    const l = k === 820304;
    if (l) {
      break;
    }
    else {
      const m = $dotCall( $array_shift, b, "shift" );
      $dotCall( $array_push, b, "push", m );
      const n = $dotCall( $array_slice, b, "slice", 0 );
      try {
        $( n );
      }
      catch (o) {
        const p = $dotCall( $array_shift, b, "shift" );
        $dotCall( $array_push, b, "push", p );
      }
    }
  }
}
const q = $dotCall( $array_slice, b, "slice", 0, 3 );
$( q );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  let test = undefined;
  try {
    const tmpBinLhs = arr[2];
    test = tmpBinLhs === 820304;
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
  $(test);
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
- (todo) fixme: spyless vars and labeled nodes
- (todo) outline any args for tdz
- (todo) phase1_1 support this array method call? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['two', 'three', 'four', 'five', 'one']
 - 3: false
 - 4: 1
 - 5: ['three', 'four', 'five', 'one', 'two']
 - 6: false
 - 7: 1
 - 8: ['four', 'five', 'one', 'two', 'three']
 - 9: false
 - 10: 1
 - 11: ['five', 'one', 'two', 'three', 'four']
 - 12: false
 - 13: 1
 - 14: ['one', 'two', 'three', 'four', 'five']
 - 15: false
 - 16: 1
 - 17: ['two', 'three', 'four', 'five', 'one']
 - 18: false
 - 19: 1
 - 20: ['three', 'four', 'five', 'one', 'two']
 - 21: false
 - 22: 1
 - 23: ['four', 'five', 'one', 'two', 'three']
 - 24: false
 - 25: 1
 - 26: ['five', 'one', 'two', 'three', 'four']
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
