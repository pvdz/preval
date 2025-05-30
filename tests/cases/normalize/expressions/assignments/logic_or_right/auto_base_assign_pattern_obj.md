# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic or right > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$($(100) || (a = { b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  const b /*:object*/ = {};
  $(a, b);
} else {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, {});
} else {
  const tmpObjLitVal = $(2);
  const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
  const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  const c = {};
  $( b, c );
}
else {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  const g = f.b;
  $( f );
  $( f, g );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
