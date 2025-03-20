# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = { b: $(1) })) {
  default:
    $(100);
}
$(a)["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
$(100);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$(100);
const a = { b: tmpObjLitVal };
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( 100 );
const b = { b: a };
const c = $( b );
c.b = 2;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
