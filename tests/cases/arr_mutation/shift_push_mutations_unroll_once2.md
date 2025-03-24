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
  const tmpCalleeParam /*:array*/ = arr.slice(0);
  $(tmpCalleeParam);
} else {
  const tmp /*:unknown*/ = arr.shift();
  arr.push(tmp);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const test$1 /*:unknown*/ = $(`never`);
    if (test$1) {
      const tmpCalleeParam$1 /*:array*/ = arr.slice(0);
      $(tmpCalleeParam$1);
      break;
    } else {
      const tmp$1 /*:unknown*/ = arr.shift();
      arr.push(tmp$1);
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
  $(arr.slice(0));
} else {
  arr.push(arr.shift());
  while (true) {
    if ($(`never`)) {
      $(arr.slice(0));
      break;
    } else {
      arr.push(arr.shift());
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
  const c = b.slice( 0 );
  $( c );
}
else {
  const d = b.shift();
  b.push( d );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const e = $( "never" );
    if (e) {
      const f = b.slice( 0 );
      $( f );
      break;
    }
    else {
      const g = b.shift();
      b.push( g );
    }
  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $array_slice
- (todo) Calling a static method on an ident that is not global and not recorded in free loop: arr.push


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
