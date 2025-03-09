# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For c > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; $(1); a = { b } = $({ b: $(2) }));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  let tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
  let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpObjLitVal$1 /*:unknown*/ = $(2);
      const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
      const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
      tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  const b /*:object*/ = {};
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpObjLitVal = $(2);
  const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
  let tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
  let tmpClusterSSA_a = tmpNestedAssignObjPatternRhs;
  while (true) {
    if ($(1)) {
      const tmpObjLitVal$1 = $(2);
      const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
      tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
      tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a, tmpClusterSSA_b);
} else {
  $({ a: 999, b: 1000 }, {});
}
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = { b: b } = $({ b: $(2) });
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  const c = { b: b };
  const d = $( c );
  let e = d.b;
  let f = d;
  while ($LOOP_UNROLL_10) {
    const g = $( 1 );
    if (g) {
      const h = $( 2 );
      const i = { b: h };
      const j = $( i );
      e = j.b;
      f = j;
    }
    else {
      break;
    }
  }
  $( f, e );
}
else {
  const k = {
    a: 999,
    b: 1000,
  };
  const l = {};
  $( k, l );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: 1
 - 5: 2
 - 6: { b: '2' }
 - 7: 1
 - 8: 2
 - 9: { b: '2' }
 - 10: 1
 - 11: 2
 - 12: { b: '2' }
 - 13: 1
 - 14: 2
 - 15: { b: '2' }
 - 16: 1
 - 17: 2
 - 18: { b: '2' }
 - 19: 1
 - 20: 2
 - 21: { b: '2' }
 - 22: 1
 - 23: 2
 - 24: { b: '2' }
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check