# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))); ; $(1))
  $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let xyz /*:unknown*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_a /*:unknown*/ = $(60);
  xyz = tmpClusterSSA_a;
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam);
  xyz = tmpClusterSSA_a$1;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
let xyz = undefined;
if (tmpIfTest) {
  xyz = $(60);
} else {
  xyz = $($(100));
}
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
let b = undefined;
if (a) {
  const c = $( 60 );
  b = c;
}
else {
  const d = $( 100 );
  const e = $( d );
  b = e;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````


## Todos triggered


- (todo) can we support this const aliasing blocking statement? WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
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
