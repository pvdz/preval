# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Logic and right > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$($(100) && (a = { b } = $({ b: $(2) })));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = {};
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(2);
  const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$($(100) && (a = { b: b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {};
let b = {
  a: 999,
  b: 1000,
};
const c = $( 100 );
if (c) {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  a = f.b;
  b = f;
  $( f );
}
else {
  $( c );
}
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: { b: '2' }
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
