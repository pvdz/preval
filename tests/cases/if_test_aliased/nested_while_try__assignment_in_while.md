# Preval test case

# nested_while_try__assignment_in_while.md

> If test aliased > Nested while try  assignment in while
>
> Test: alias with assignment in while (should not fire)

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  while (c) {
    a = 1;
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
//   while (c) {
//     a = 1;
//     $(a);
//   }
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(1);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    $(1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 1 );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  while (true) {
    if (c) {
      a = 1;
      $(a);
    } else {
      break;
    }
  }
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
