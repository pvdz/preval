# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Logic or both > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) || ({ b } = $({ b: $(2) }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpNestedAssignObjPatternRhs) {
  $(a, b);
} else {
  const tmpObjLitVal$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_b /*:unknown*/ = tmpAssignObjPatternRhs.b;
  $(a, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const b = tmpNestedAssignObjPatternRhs.b;
const a = { a: 999, b: 1000 };
if (tmpNestedAssignObjPatternRhs) {
  $(a, b);
} else {
  const tmpObjLitVal$1 = $(2);
  $(a, $({ b: tmpObjLitVal$1 }).b);
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
  $( e, d );
}
else {
  const f = $( 2 );
  const g = { b: f };
  const h = $( g );
  const i = h.b;
  $( e, i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpObjLitVal = $(2);
let tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpIfTest = tmpNestedAssignObjPatternRhs;
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpObjLitVal$1 = $(2);
  let tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam$1);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
