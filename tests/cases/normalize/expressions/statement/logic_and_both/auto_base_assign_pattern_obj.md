# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Logic and both > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) && ({ b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpNestedAssignObjPatternRhs) {
  const tmpObjLitVal$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_b$1 /*:unknown*/ = tmpAssignObjPatternRhs.b;
  $(a, tmpClusterSSA_b$1);
} else {
  $(a, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
const a = { a: 999, b: 1000 };
if (tmpNestedAssignObjPatternRhs) {
  const tmpObjLitVal$1 = $(2);
  $(a, $({ b: tmpObjLitVal$1 }).b);
} else {
  $(a, tmpClusterSSA_b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = {
  a: 999,
  b: 1000,
};
if (c) {
  const f = $( 2 );
  const g = { b: f };
  const h = $( g );
  const i = h.b;
  $( e, i );
}
else {
  $( e, d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
