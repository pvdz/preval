# Preval test case

# auto_computed_complex_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto computed complex complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
$(a)[$("b")] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(undefined);
const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj /*:unknown*/ = $(tmpNestedComplexRhs);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(undefined);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = $(tmpNestedComplexRhs);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
const b = { b: a };
const c = $( b );
const d = $( "b" );
const e = $( 2 );
c[d] = e;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { b: '1' }
 - 4: 'b'
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
