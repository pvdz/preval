# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = 0 || $($(1))); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_a);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(1));
while (true) {
  $(tmpClusterSSA_a);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
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
