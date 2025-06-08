# Preval test case

# spread.md

> Object literal > Spread
>
>

## Input

`````js filename=intro
const x = $({ a: 1, b: 2 });
const b /*:object*/ = { x: 1, ...x };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  b.x = 3;
  b.x = 3;
  $(1);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const x /*:unknown*/ = $(tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { x: 1, ...x };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  b.x = 3;
  b.x = 3;
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $({ a: 1, b: 2 });
const b = { x: 1, ...x };
while (true) {
  b.x = 3;
  b.x = 3;
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = {
  x: 1,
  ... b,
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  c.x = 3;
  c.x = 3;
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1, b: 2 };
const x = $(tmpCalleeParam);
const b = { x: 1, ...x };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  b.x = 3;
  b.x = 3;
  $(1);
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
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
