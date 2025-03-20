# Preval test case

# auto_seq_complex_computed_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto seq complex computed simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { b: $(1) })]: 10 });
($(1), $(a))["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(1);
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$({ [a]: 10 });
$(1);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = { [ b ]: 10 };
$( c );
$( 1 );
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
 - 2: { '[object Object]': '10' }
 - 3: 1
 - 4: { b: '1' }
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
