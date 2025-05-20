# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = { b: $(1) }));
$(a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
} else {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
if ($(0)) {
  $($(100));
} else {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = $( 1 );
  const e = { b: d };
  a = e;
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
 - 1: 0
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
