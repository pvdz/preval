# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = { b: $(1) }) : $(200));
$(a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpCalleeParam);
}
const tmpAssignMemLhsObj$1 /*:unknown*/ = $(a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(1)) {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $($(200));
}
const tmpAssignMemLhsObj$1 = $(a);
tmpAssignMemLhsObj$1.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( 1 );
  const d = { b: c };
  a = d;
  $( d );
}
else {
  const e = $( 200 );
  $( e );
}
const f = $( a );
const g = $( 2 );
f.b = g;
$( a );
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
