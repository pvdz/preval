# Preval test case

# auto_computed_complex_simple_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto computed complex simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
$(a)["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal$1 };
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $(1);
const a = { b: tmpObjLitVal$1 };
$({ x: a });
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = { x: b };
$( c );
const d = $( b );
const e = $( 2 );
d.b = e;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '{"b":"1"}' }
 - 3: { b: '1' }
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
