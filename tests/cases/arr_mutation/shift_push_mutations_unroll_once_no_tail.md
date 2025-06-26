# Preval test case

# shift_push_mutations_unroll_once_no_tail.md

> Arr mutation > Shift push mutations unroll once no tail
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_2) {      // The unrolled body is not in a loop so it can inline there (that's how we unroll this hack anyways)
  const test = $('never');
  if (test) {
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
if (test) {
} else {
  const arr /*:array*/ /*truthy*/ = [2, 3, 4, 5, 1];
  while ($LOOP_UNROLL_1) {
    const test$1 /*:unknown*/ = $(`never`);
    if (test$1) {
      break;
    } else {
      const tmp$1 /*:primitive*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
      $dotCall($array_push, arr, `push`, tmp$1);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(`never`)) {
  const arr = [2, 3, 4, 5, 1];
  while (true) {
    if ($(`never`)) {
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
if (a) {

}
else {
  const b = [ 2, 3, 4, 5, 1 ];
  while ($LOOP_UNROLL_1) {
    const c = $( "never" );
    if (c) {
      break;
    }
    else {
      const d = $dotCall( $array_shift, b, "shift" );
      $dotCall( $array_push, b, "push", d );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_2) {
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
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'never'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
