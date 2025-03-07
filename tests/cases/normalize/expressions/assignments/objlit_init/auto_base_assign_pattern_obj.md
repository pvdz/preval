# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Objlit init > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$({ x: (a = { b } = $({ b: $(2) })) });
$(a, b);
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpCalleeParam /*:object*/ = { x: tmpNestedAssignObjPatternRhs };
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal$1 });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
$({ x: tmpNestedAssignObjPatternRhs });
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$({ x: (a = { b: b } = $({ b: $(2) })) });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = { x: c };
$( e );
$( c, d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { x: '{"b":"2"}' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
