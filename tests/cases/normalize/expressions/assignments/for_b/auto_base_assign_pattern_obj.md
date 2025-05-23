# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For b > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; (a = { b } = $({ b: $(2) })); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
let b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
let a /*:unknown*/ = tmpNestedAssignObjPatternRhs;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
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
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
let b = tmpNestedAssignObjPatternRhs.b;
let a = tmpNestedAssignObjPatternRhs;
if (tmpNestedAssignObjPatternRhs) {
  while (true) {
    $(1);
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
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
let d = c.b;
let e = c;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const f = $( 2 );
    const g = { b: f };
    const h = $( g );
    d = h.b;
    e = h;
    if (h) {

    }
    else {
      break;
    }
  }
  $( e, d );
}
else {
  $( e, d );
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - 6: 1
 - 7: 2
 - 8: { b: '2' }
 - 9: 1
 - 10: 2
 - 11: { b: '2' }
 - 12: 1
 - 13: 2
 - 14: { b: '2' }
 - 15: 1
 - 16: 2
 - 17: { b: '2' }
 - 18: 1
 - 19: 2
 - 20: { b: '2' }
 - 21: 1
 - 22: 2
 - 23: { b: '2' }
 - 24: 1
 - 25: 2
 - 26: { b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
