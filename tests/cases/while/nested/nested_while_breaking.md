# Preval test case

# nested_while_breaking.md

> While > Nested > Nested while breaking
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
      break;
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
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
while (true) {
  $(2);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 2 );
  $( true );
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: 2
 - 5: true
 - 6: 2
 - 7: true
 - 8: 2
 - 9: true
 - 10: 2
 - 11: true
 - 12: 2
 - 13: true
 - 14: 2
 - 15: true
 - 16: 2
 - 17: true
 - 18: 2
 - 19: true
 - 20: 2
 - 21: true
 - 22: 2
 - 23: true
 - 24: 2
 - 25: true
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
