# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Do while > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(x);
  $(y);
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
while (true) {
  $(100);
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( a );
  $( b );
  const c = $( 3 );
  const d = $( 4 );
  a = c;
  b = d;
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 100
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 100
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 100
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
