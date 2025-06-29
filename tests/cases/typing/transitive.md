# Preval test case

# transitive.md

> Typing > Transitive
>
> The alias target was getting typed as "unknown" even though it was assigned a value known to be a number.

## Input

`````js filename=intro
let original_target /*:number*/ /*truthy*/ = 27;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const alias_target /*:unknown*/ = original_target;
  $(original_target);
  const opaque_test /*:boolean*/ = $(true);
  if (opaque_test) {
    original_target = 7;
  } else {
    $(alias_target);
  }
}
`````


## Settled


`````js filename=intro
let original_target /*:number*/ /*truthy*/ = 27;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const alias_target /*:number*/ /*truthy*/ = original_target;
  $(original_target);
  const opaque_test /*:unknown*/ = $(true);
  if (opaque_test) {
    original_target = 7;
  } else {
    $(alias_target);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let original_target = 27;
while (true) {
  const alias_target = original_target;
  $(original_target);
  if ($(true)) {
    original_target = 7;
  } else {
    $(alias_target);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 27;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a;
  $( a );
  const c = $( true );
  if (c) {
    a = 7;
  }
  else {
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let original_target = 27;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const alias_target = original_target;
  $(original_target);
  const opaque_test = $(true);
  if (opaque_test) {
    original_target = 7;
  } else {
    $(alias_target);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 27
 - 2: true
 - 3: 7
 - 4: true
 - 5: 7
 - 6: true
 - 7: 7
 - 8: true
 - 9: 7
 - 10: true
 - 11: 7
 - 12: true
 - 13: 7
 - 14: true
 - 15: 7
 - 16: true
 - 17: 7
 - 18: true
 - 19: 7
 - 20: true
 - 21: 7
 - 22: true
 - 23: 7
 - 24: true
 - 25: 7
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
