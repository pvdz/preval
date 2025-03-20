# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Statement > For let > Auto ident array empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = []; ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:array*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xyz = [];
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````


## Todos triggered


- objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 1
 - 3: []
 - 4: 1
 - 5: []
 - 6: 1
 - 7: []
 - 8: 1
 - 9: []
 - 10: 1
 - 11: []
 - 12: 1
 - 13: []
 - 14: 1
 - 15: []
 - 16: 1
 - 17: []
 - 18: 1
 - 19: []
 - 20: 1
 - 21: []
 - 22: 1
 - 23: []
 - 24: 1
 - 25: []
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
