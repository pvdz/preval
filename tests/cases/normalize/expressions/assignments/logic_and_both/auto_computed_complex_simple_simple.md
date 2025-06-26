# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
$(a)["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const tmpNestedComplexRhs /*:object*/ /*truthy*/ = { b: tmpObjLitVal$1 };
$(tmpNestedComplexRhs);
const tmpAssignMemLhsObj /*:unknown*/ = $(tmpNestedComplexRhs);
tmpAssignMemLhsObj.b = 2;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpObjLitVal$1 = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
$(tmpNestedComplexRhs);
const tmpAssignMemLhsObj = $(tmpNestedComplexRhs);
tmpAssignMemLhsObj.b = 2;
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( b );
c.b = 2;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - 4: { b: '1' }
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
