# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { b: $(1) })) {}
$(f());
$(a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(undefined);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(undefined);
const a = { b: tmpObjLitVal };
const tmpAssignMemLhsObj$1 = $(a);
tmpAssignMemLhsObj$1.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
const b = { b: a };
const c = $( b );
const d = $( 2 );
c.b = d;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { b: '1' }
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
