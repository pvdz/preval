# Preval test case

# auto_seq_complex_computed_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto seq complex computed simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
($(1), $(a))["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpClusterSSA_a /*:object*/ = { b: tmpObjLitVal$1 };
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(tmpClusterSSA_a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = $(1);
const a = { b: tmpObjLitVal };
const tmpClusterSSA_a = { b: tmpObjLitVal$1 };
$(a + tmpClusterSSA_a);
$(1);
const tmpAssignMemLhsObj$1 = $(tmpClusterSSA_a);
tmpAssignMemLhsObj$1.b = $(2);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = { b: b };
const e = c + d;
$( e );
$( 1 );
const f = $( d );
const g = $( 2 );
f.b = g;
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: 1
 - 5: { b: '1' }
 - 6: 2
 - 7: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
