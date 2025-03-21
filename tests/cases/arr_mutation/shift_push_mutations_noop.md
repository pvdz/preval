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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) { // The refs inside a loop should not be inlined
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
const arr /*:array*/ = [1, 2, 3, 4, 5];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const test /*:unknown*/ = $(`never`);
  if (test) {
    break;
  } else {
    const tmp /*:unknown*/ = arr.shift();
    arr.push(tmp);
  }
}
const tmpCalleeParam /*:array*/ = arr.slice(0);
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
    arr.push(arr.shift());
  }
}
$(arr.slice(0));
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
$(arr.slice(0));
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
const tmpCalleeParam = arr.slice(0);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( "never" );
  if (b) {
    break;
  }
  else {
    const c = a.shift();
    a.push( c );
  }
}
const d = a.slice( 0 );
$( d );
`````

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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_push
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
