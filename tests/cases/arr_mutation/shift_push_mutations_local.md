# Preval test case

# shift_push_mutations_local.md

> Arr mutation > Shift push mutations local
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) { // Unrelated to loop unrolling so let's skip that
  const arr = [1, 2, 3, 4];
  const test = $('never');
  if (test) {
    $(arr);
    break;
  } else {
    const tmp = arr.shift();  // This statement should be inlined (arr was created inside the loop)
    arr.push(tmp);            // This statement should be inlined (arr was created inside the loop)
    $(arr.slice(0));          // Don't let arr escape
  }
}
$('exit');
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const test /*:unknown*/ = $(`never`);
  const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4];
  if (test) {
    $(arr);
    break;
  } else {
    const tmp /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, tmp);
    const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
    $(tmpCalleeParam);
  }
}
$(`exit`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const test = $(`never`);
  const arr = [1, 2, 3, 4];
  if (test) {
    $(arr);
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
    $($dotCall($array_slice, arr, `slice`, 0));
  }
}
$(`exit`);
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( "never" );
  const b = [ 1, 2, 3, 4 ];
  if (a) {
    $( b );
    break;
  }
  else {
    const c = $dotCall( $array_shift, b, "shift" );
    $dotCall( $array_push, b, "push", c );
    const d = $dotCall( $array_slice, b, "slice", 0 );
    $( d );
  }
}
$( "exit" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const arr = [1, 2, 3, 4];
  const test = $(`never`);
  if (test) {
    $(arr);
    break;
  } else {
    const tmpMCF = arr.shift;
    const tmp = $dotCall(tmpMCF, arr, `shift`);
    const tmpMCF$1 = arr.push;
    $dotCall(tmpMCF$1, arr, `push`, tmp);
    const tmpMCF$3 = arr.slice;
    let tmpCalleeParam = $dotCall(tmpMCF$3, arr, `slice`, 0);
    $(tmpCalleeParam);
  }
}
$(`exit`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'never'
 - 2: [1, 2, 3, 4]
 - 3: 'exit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
