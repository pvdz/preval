# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > For let > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let xyz = (b = $(2)); ; $(1)) $(xyz);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(b);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
while (true) {
  $(b);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
