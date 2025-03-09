# Preval test case

# auto_seq_complex_prop.md

> Normalize > Expressions > Assignments > Logic and both > Auto seq complex prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
($(1), $(a)).b = $(2);
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
let a /*:unknown*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpObjLitVal$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:object*/ = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
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
const tmpCalleeParam = a;
if (a) {
  const tmpObjLitVal$1 = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal$1 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(1);
} else {
  $(tmpCalleeParam);
  $(1);
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) && (a = { b: $(1) }));
($(1), $(a)).b = $(2);
$(a);
`````

## Normalized


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

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = { b: a };
const c = b;
if (b) {
  const d = $( 1 );
  const e = { b: d };
  b = e;
  $( e );
  $( 1 );
}
else {
  $( c );
  $( 1 );
}
const f = $( b );
const g = $( 2 );
f.b = g;
$( b );
`````

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
