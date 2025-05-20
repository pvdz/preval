# Preval test case

# auto_computed_complex_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto computed complex simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
$(a)["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
let a /*:unknown*/ = { b: tmpObjLitVal };
if (a) {
  const tmpObjLitVal$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(a);
}
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
let a = { b: tmpObjLitVal };
if (a) {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(a);
}
const tmpAssignMemLhsObj$1 = $(a);
tmpAssignMemLhsObj$1.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = { b: a };
if (b) {
  const c = $( 1 );
  const d = { b: c };
  b = d;
  $( d );
}
else {
  $( b );
}
const e = $( b );
const f = $( 2 );
e.b = f;
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
 - 3: { b: '1' }
 - 4: { b: '1' }
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
