# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic or left > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a = { b } = $({ b: $(2) })) || $(100));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
} else {
  $($(100));
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
}
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$((a = { b: b } = $({ b: $(2) })) || $(100));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
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
  const e = $( 100 );
  $( e );
  $( c, d );
}
`````

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
