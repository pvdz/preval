# Preval test case

# shift_push_mutations_unroll_once2.md

> Arr mutation > Shift push mutations unroll once2
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
    $(arr.slice(0));              // Don't let arr escape
    break;
  } else {
    const tmp = arr.shift();  // This statement should be kept
    arr.push(tmp);            // This statement should be kept (too)
  }
}
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(`never`);
const arr /*:array*/ = [1, 2, 3, 4, 5];
if (test) {
  const tmpCalleeParam /*:array*/ = $dotCall($array_slice, arr, `slice`, 0);
  $(tmpCalleeParam);
} else {
  const tmp /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
  $dotCall($array_push, arr, `push`, tmp);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const test$1 /*:unknown*/ = $(`never`);
    if (test$1) {
      const tmpCalleeParam$1 /*:array*/ = $dotCall($array_slice, arr, `slice`, 0);
      $(tmpCalleeParam$1);
      break;
    } else {
      const tmp$1 /*:unknown*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, tmp$1);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = $(`never`);
const arr = [1, 2, 3, 4, 5];
if (test) {
  $($dotCall($array_slice, arr, `slice`, 0));
} else {
  $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  while (true) {
    if ($(`never`)) {
      $($dotCall($array_slice, arr, `slice`, 0));
      break;
    } else {
      $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "never" );
const b = [ 1, 2, 3, 4, 5 ];
if (a) {
  const c = $dotCall( $array_slice, b, "slice", 0 );
  $( c );
}
else {
  const d = $dotCall( $array_shift, b, "shift" );
  $dotCall( $array_push, b, "push", d );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const e = $( "never" );
    if (e) {
      const f = $dotCall( $array_slice, b, "slice", 0 );
      $( f );
      break;
    }
    else {
      const g = $dotCall( $array_shift, b, "shift" );
      $dotCall( $array_push, b, "push", g );
    }
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_slice
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) support array reads statement type WhileStatement
- (todo) phase1_1 support this array method call? $array_slice
- (todo) support array reads statement type VarStatement
- (todo) - at least one of the frfr args was not isFree, bailing


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
