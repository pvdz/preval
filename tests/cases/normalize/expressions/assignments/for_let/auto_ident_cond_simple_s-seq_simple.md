# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = 1 ? (40, 50, 60) : $($(100))); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(60);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(60);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 60 );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 60
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 60
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 60
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 60
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
