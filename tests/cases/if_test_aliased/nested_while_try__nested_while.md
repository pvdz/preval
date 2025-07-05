# Preval test case

# nested_while_try__nested_while.md

> If test aliased > Nested while try  nested while
>
> Test: alias with nested while

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  while (c) {
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
//   while (c) {
//     $(false);
//   }
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(false);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    $(false);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  while ($LOOP_NO_UNROLLS_LEFT) {
    $( false );
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
 - 2: false
 - 3: false
 - 4: false
 - 5: false
 - 6: false
 - 7: false
 - 8: false
 - 9: false
 - 10: false
 - 11: false
 - 12: false
 - 13: false
 - 14: false
 - 15: false
 - 16: false
 - 17: false
 - 18: false
 - 19: false
 - 20: false
 - 21: false
 - 22: false
 - 23: false
 - 24: false
 - 25: false
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
