# Preval test case

# nested_while_no_break.md

> While > Nested > Nested while no break
>
> The inner break was a continue. But this pattern can be rewritten
> to a single loop: `while (true) { X: { ... break X; } }`

## Input

`````js filename=intro
$(1);
while (true) {
  while (true) {
    $(2);
    if ($(true)) {
      $(3);
    }
  }
}
$(3);
`````


## Settled


`````js filename=intro
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(2);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(3);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
while (true) {
  $(2);
  if ($(true)) {
    $(3);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 2 );
  const a = $( true );
  if (a) {
    $( 3 );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 3
 - 5: 2
 - 6: true
 - 7: 3
 - 8: 2
 - 9: true
 - 10: 3
 - 11: 2
 - 12: true
 - 13: 3
 - 14: 2
 - 15: true
 - 16: 3
 - 17: 2
 - 18: true
 - 19: 3
 - 20: 2
 - 21: true
 - 22: 3
 - 23: 2
 - 24: true
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
