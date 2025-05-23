# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic or both > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) || (a = { b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, b);
} else {
  const tmpObjLitVal$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$3 /*:object*/ = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.b;
  $(tmpNestedAssignObjPatternRhs$1);
  $(tmpNestedAssignObjPatternRhs$1, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, b);
} else {
  const tmpObjLitVal$1 = $(2);
  const tmpNestedAssignObjPatternRhs$1 = $({ b: tmpObjLitVal$1 });
  const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
  $(tmpNestedAssignObjPatternRhs$1);
  $(tmpNestedAssignObjPatternRhs$1, tmpClusterSSA_b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
if (c) {
  $( c );
  $( c, d );
}
else {
  const e = $( 2 );
  const f = { b: e };
  const g = $( f );
  const h = g.b;
  $( g );
  $( g, h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
let tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpObjLitVal$1 = $(2);
  let tmpCalleeParam$3 = { b: tmpObjLitVal$1 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
  b = tmpNestedAssignObjPatternRhs$1.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
 - 3: { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
