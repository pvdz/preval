# Preval test case

# shift_push_mutations_noop.md

> Arr mutation > Shift push mutations noop
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside 
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_NO_UNROLLS_LEFT) { // The refs inside a loop should not be inlined
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
const arr /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
while ($LOOP_NO_UNROLLS_LEFT) {
  const test /*:unknown*/ = $(`never`);
  if (test) {
    break;
  } else {
    const tmp /*:unknown*/ /*truthy*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, tmp);
  }
}
const tmpCalleeParam /*:array*/ /*truthy*/ = $dotCall($array_slice, arr, `slice`, 0);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while (true) {
  if ($(`never`)) {
    break;
  } else {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  }
}
$($dotCall($array_slice, arr, `slice`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const b = $( "never" );
  if (b) {
    break;
  }
  else {
    const c = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", c );
  }
}
const d = $dotCall( $array_slice, a, "slice", 0 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_NO_UNROLLS_LEFT) {
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


- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_slice
- (todo) phase1_1 support this array method call? $array_slice
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
