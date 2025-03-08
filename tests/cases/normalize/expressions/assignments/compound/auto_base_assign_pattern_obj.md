# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Compound > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$((a *= { b } = $({ b: $(2) })));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpNestedAssignObjPatternRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpNestedAssignObjPatternRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$((a *= { b: b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a, b);
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
const f = e * c;
$( f );
$( f, d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: NaN
 - 4: NaN, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
