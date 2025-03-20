# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Param default > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
function f(p = (a = { b } = $({ b: $(2) }))) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
$(undefined);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
$(undefined);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
$( undefined );
$( c, d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: undefined
 - 4: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
