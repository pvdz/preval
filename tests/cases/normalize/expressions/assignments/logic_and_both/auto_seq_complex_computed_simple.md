# Preval test case

# auto_seq_complex_computed_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto seq complex computed simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
($(1), $(a))["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const tmpNestedComplexRhs /*:object*/ /*truthy*/ = { b: tmpObjLitVal$1 };
$(tmpNestedComplexRhs);
$(1);
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(tmpNestedComplexRhs);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpObjLitVal$1 = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
$(tmpNestedComplexRhs);
$(1);
const tmpAssignMemLhsObj$1 = $(tmpNestedComplexRhs);
tmpAssignMemLhsObj$1.b = $(2);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = { b: a };
$( b );
$( 1 );
const c = $( b );
const d = $( 2 );
c.b = d;
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
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
}
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
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
 - 4: 1
 - 5: { b: '1' }
 - 6: 2
 - 7: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
