# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Do while > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = { b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  let a /*:unknown*/ = undefined;
  let b /*:unknown*/ = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const tmpObjLitVal$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { b: tmpObjLitVal$1 };
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
$(100);
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  let a = undefined;
  let b = undefined;
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


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
if (c) {
  let e = undefined;
  let f = undefined;
  while ($LOOP_UNROLLS_LEFT_10) {
    $( 100 );
    const g = $( 2 );
    const h = { b: g };
    const i = $( h );
    f = i.b;
    e = i;
    if (i) {

    }
    else {
      break;
    }
  }
  $( e, f );
}
else {
  $( c, d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpObjLitVal = $(2);
  let tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: 100
 - 5: 2
 - 6: { b: '2' }
 - 7: 100
 - 8: 2
 - 9: { b: '2' }
 - 10: 100
 - 11: 2
 - 12: { b: '2' }
 - 13: 100
 - 14: 2
 - 15: { b: '2' }
 - 16: 100
 - 17: 2
 - 18: { b: '2' }
 - 19: 100
 - 20: 2
 - 21: { b: '2' }
 - 22: 100
 - 23: 2
 - 24: { b: '2' }
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
