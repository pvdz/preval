# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > Logic and right > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = { b: $(1) }));
($(1), a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
}
const tmpAssignMemRhs /*:unknown*/ = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
}
a.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  const c = $( 1 );
  const d = { b: c };
  a = d;
  $( d );
  $( 1 );
}
else {
  $( b );
  $( 1 );
}
const e = $( 2 );
a.b = e;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
}
const tmpAssignMemLhsObj = a;
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
 - 1: 100
 - 2: 1
 - 3: { b: '1' }
 - 4: 1
 - 5: 2
 - 6: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
