# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = [$(1), 2, $(3)]); $(1));
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(3);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(1);
  $(3);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 3 );
  $( 1 );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
