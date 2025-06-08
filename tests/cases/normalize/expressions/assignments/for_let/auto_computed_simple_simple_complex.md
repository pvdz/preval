# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > For let > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = { b: $(1) }); ; $(1)) $(xyz);
a["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const xyz /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const xyz = { b: tmpObjLitVal };
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 1
 - 4: { b: '1' }
 - 5: 1
 - 6: { b: '1' }
 - 7: 1
 - 8: { b: '1' }
 - 9: 1
 - 10: { b: '1' }
 - 11: 1
 - 12: { b: '1' }
 - 13: 1
 - 14: { b: '1' }
 - 15: 1
 - 16: { b: '1' }
 - 17: 1
 - 18: { b: '1' }
 - 19: 1
 - 20: { b: '1' }
 - 21: 1
 - 22: { b: '1' }
 - 23: 1
 - 24: { b: '1' }
 - 25: 1
 - 26: { b: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
