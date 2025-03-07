# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > For let > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = delete $(arg)["y"]); ; $(1)) $(xyz);
$(a, arg);
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_a);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteObj = $({ y: 1 });
const tmpClusterSSA_a = delete tmpDeleteObj.y;
while (true) {
  $(tmpClusterSSA_a);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = delete $(arg)[`y`]);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: 1
 - 4: true
 - 5: 1
 - 6: true
 - 7: 1
 - 8: true
 - 9: 1
 - 10: true
 - 11: 1
 - 12: true
 - 13: 1
 - 14: true
 - 15: 1
 - 16: true
 - 17: 1
 - 18: true
 - 19: 1
 - 20: true
 - 21: 1
 - 22: true
 - 23: 1
 - 24: true
 - 25: 1
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- regular property access of an ident feels tricky;