# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Binary right > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$($(100) + (a = { b } = $({ b: $(2) })));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
$(tmpBinBothLhs + tmpNestedAssignObjPatternRhs);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
const f = a + d;
$( f );
$( d, e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: '100[object Object]'
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
