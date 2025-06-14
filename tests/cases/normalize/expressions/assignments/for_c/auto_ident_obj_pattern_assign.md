# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > For c > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = { x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  let tmpClusterSSA_x /*:unknown*/ = tmpObjLitVal;
  let tmpClusterSSA_y /*:unknown*/ = tmpObjLitVal$1;
  let tmpClusterSSA_a /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$2 /*:unknown*/ = $(3);
      const tmpObjLitVal$4 /*:unknown*/ = $(4);
      tmpClusterSSA_x = tmpObjLitVal$2;
      tmpClusterSSA_y = tmpObjLitVal$4;
      tmpClusterSSA_a = { x: tmpObjLitVal$2, y: tmpObjLitVal$4 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  let tmpClusterSSA_x = tmpObjLitVal;
  let tmpClusterSSA_y = tmpObjLitVal$1;
  let tmpClusterSSA_a = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  while (true) {
    if ($(1)) {
      const tmpObjLitVal$2 = $(3);
      const tmpObjLitVal$4 = $(4);
      tmpClusterSSA_x = tmpObjLitVal$2;
      tmpClusterSSA_y = tmpObjLitVal$4;
      tmpClusterSSA_a = { x: tmpObjLitVal$2, y: tmpObjLitVal$4 };
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  let d = b;
  let e = c;
  let f = {
    x: b,
    y: c,
  };
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 3 );
      const i = $( 4 );
      d = h;
      e = i;
      f = {
        x: h,
        y: i,
      };
    }
    else {
      break;
    }
  }
  $( f, d, e );
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j, 1, 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpNestedAssignObjPatternRhs.x;
    y = tmpNestedAssignObjPatternRhs.y;
    a = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a, x, y);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: 1
 - 5: 3
 - 6: 4
 - 7: 1
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 1
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 1
 - 20: 3
 - 21: 4
 - 22: 1
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
