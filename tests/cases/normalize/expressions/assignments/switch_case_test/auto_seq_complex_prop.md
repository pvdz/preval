# Preval test case

# auto_seq_complex_prop.md

> Normalize > Expressions > Assignments > Switch case test > Auto seq complex prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { b: $(1) }):
}
($(1), $(a)).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpObjLitVal /*:unknown*/ = $(1);
$(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpObjLitVal = $(1);
$(1);
const a = { b: tmpObjLitVal };
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
$( 1 );
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
 - 2: 1
 - 3: 1
 - 4: { b: '1' }
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
