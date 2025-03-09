# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > While > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
while ((a = { b } = $({ b: $(2) }))) $(100);
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = undefined;
let a /*:unknown*/ = undefined;
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpObjLitVal$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
    const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    b = tmpNestedAssignObjPatternRhs$1.b;
    a = tmpNestedAssignObjPatternRhs$1;
    if (tmpNestedAssignObjPatternRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  while (true) {
    $(100);
    const tmpObjLitVal$1 = $(2);
    const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
    b = tmpNestedAssignObjPatternRhs$1.b;
    a = tmpNestedAssignObjPatternRhs$1;
    if (!tmpNestedAssignObjPatternRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while ((a = { b: b } = $({ b: $(2) }))) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $( 2 );
const d = { b: c };
const e = $( d );
const f = e.b;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( 2 );
    const h = { b: g };
    const i = $( h );
    a = i.b;
    b = i;
    if (i) {

    }
    else {
      break;
    }
  }
  $( b, a );
}
else {
  $( e, f );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 100
 - 4: 2
 - 5: { b: '2' }
 - 6: 100
 - 7: 2
 - 8: { b: '2' }
 - 9: 100
 - 10: 2
 - 11: { b: '2' }
 - 12: 100
 - 13: 2
 - 14: { b: '2' }
 - 15: 100
 - 16: 2
 - 17: { b: '2' }
 - 18: 100
 - 19: 2
 - 20: { b: '2' }
 - 21: 100
 - 22: 2
 - 23: { b: '2' }
 - 24: 100
 - 25: 2
 - 26: { b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check