# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For c > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  let tmpClusterSSA_x /*:unknown*/ = tmpObjLitVal;
  let tmpClusterSSA_y /*:unknown*/ = tmpObjLitVal$1;
  let tmpClusterSSA_a /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(tmpClusterSSA_x);
      $(tmpClusterSSA_y);
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
  $(1);
  $(2);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  let tmpClusterSSA_x = tmpObjLitVal;
  let tmpClusterSSA_y = tmpObjLitVal$1;
  let tmpClusterSSA_a = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  while (true) {
    if ($(1)) {
      $(tmpClusterSSA_x);
      $(tmpClusterSSA_y);
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
  $( 1 );
  $( 2 );
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
      $( d );
      $( e );
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
    $(x);
    $(y);
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
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 1
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 1
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 1
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
