# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = { x: $(1), y: 2, z: $(3) });
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpObjLitVal$3 /*:unknown*/ = $(3);
  let tmpClusterSSA_a /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(1);
      const tmpObjLitVal$4 /*:unknown*/ = $(3);
      tmpClusterSSA_a = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$4 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$3 = $(3);
  let tmpClusterSSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  while (true) {
    if ($(1)) {
      const tmpObjLitVal$1 = $(1);
      const tmpObjLitVal$4 = $(3);
      tmpClusterSSA_a = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$4 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( 3 );
  let d = {
    x: b,
    y: 2,
    z: c,
  };
  while ($LOOP_UNROLLS_LEFT_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 1 );
      const g = $( 3 );
      d = {
        x: f,
        y: 2,
        z: g,
      };
    }
    else {
      break;
    }
  }
  $( d );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$3 = $(3);
    a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
