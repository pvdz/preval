# Preval test case

# shift_push_mutations_unroll_once.md

> Arr mutation > Shift push mutations unroll once
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_1) {      // The unrolled body is not in a loop so it can inline there (that's how we unroll this hack anyways)
  const test = $('never');
  if (test) {
    break;
  } else {
    const tmp = arr.shift();  // This statement should be kept
    arr.push(tmp);            // This statement should be kept (too)
  }
}
$(arr.slice(0));              // Don't let arr escape
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(`never`);
const arr /*:array*/ = [1, 2, 3, 4, 5];
if (test) {
} else {
  const tmp /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
  $dotCall($array_push, arr, `push`, tmp);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const test$1 /*:unknown*/ = $(`never`);
    if (test$1) {
      break;
    } else {
      const tmp$1 /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, tmp$1);
    }
  }
}
const tmpCalleeParam /*:array*/ = $dotCall($array_slice, arr, `slice`, 0);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = $(`never`);
const arr = [1, 2, 3, 4, 5];
if (!test) {
  $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  while (true) {
    if ($(`never`)) {
      break;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  }
}
$($dotCall($array_slice, arr, `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "never" );
const b = [ 1, 2, 3, 4, 5 ];
if (a) {

}
else {
  const c = $dotCall( $array_shift, b, "shift" );
  $dotCall( $array_push, b, "push", c );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const d = $( "never" );
    if (d) {
      break;
    }
    else {
      const e = $dotCall( $array_shift, b, "shift" );
      $dotCall( $array_push, b, "push", e );
    }
  }
}
const f = $dotCall( $array_slice, b, "slice", 0 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_1) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmpMCF = arr.shift;
    const tmp = $dotCall(tmpMCF, arr, `shift`);
    const tmpMCF$1 = arr.push;
    $dotCall(tmpMCF$1, arr, `push`, tmp);
  }
}
const tmpMCF$3 = arr.slice;
let tmpCalleeParam = $dotCall(tmpMCF$3, arr, `slice`, 0);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_slice
- (todo) phase1_1 support this array method call? $array_slice
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'never'
 - 2: [1, 2, 3, 4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
