# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > While > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
while (({ b } = $({ b: $(2) }))) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
let tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpObjLitVal$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
    const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
    if (tmpNestedAssignObjPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
let tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  while (true) {
    $(100);
    const tmpObjLitVal$1 = $(2);
    const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
    tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
    if (!tmpNestedAssignObjPatternRhs$1) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
let d = c.b;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( 2 );
    const f = { b: e };
    const g = $( f );
    d = g.b;
    if (g) {

    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, d );
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


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
