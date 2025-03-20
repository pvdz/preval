# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) || (a = { b: $(1) }));
$(a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
let a /*:unknown*/ = { b: tmpObjLitVal };
if (a) {
  $(a);
} else {
  const tmpObjLitVal$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
let a = { b: tmpObjLitVal };
if (a) {
  $(a);
} else {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = { b: a };
if (b) {
  $( b );
}
else {
  const c = $( 1 );
  const d = { b: c };
  b = d;
  $( d );
}
const e = $( b );
const f = $( 2 );
e.b = f;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
