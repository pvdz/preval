# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let xyz /*:unknown*/ = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam);
  xyz = a;
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
let xyz = 60;
if (!tmpIfTest) {
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
let b = 60;
if (a) {

}
else {
  const c = $( 100 );
  const d = $( c );
  b = d;
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
 - 3: 1
 - 4: 60
 - 5: 1
 - 6: 60
 - 7: 1
 - 8: 60
 - 9: 1
 - 10: 60
 - 11: 1
 - 12: 60
 - 13: 1
 - 14: 60
 - 15: 1
 - 16: 60
 - 17: 1
 - 18: 60
 - 19: 1
 - 20: 60
 - 21: 1
 - 22: 60
 - 23: 1
 - 24: 60
 - 25: 1
 - 26: 60
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
