# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = [$(1), 2, $(3)]); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const xyz /*:array*/ /*truthy*/ = [tmpArrElement, 2, tmpArrElement$3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const xyz = [tmpArrElement, 2, tmpArrElement$3];
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
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
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: 1
 - 5: [1, 2, 3]
 - 6: 1
 - 7: [1, 2, 3]
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 1
 - 11: [1, 2, 3]
 - 12: 1
 - 13: [1, 2, 3]
 - 14: 1
 - 15: [1, 2, 3]
 - 16: 1
 - 17: [1, 2, 3]
 - 18: 1
 - 19: [1, 2, 3]
 - 20: 1
 - 21: [1, 2, 3]
 - 22: 1
 - 23: [1, 2, 3]
 - 24: 1
 - 25: [1, 2, 3]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
