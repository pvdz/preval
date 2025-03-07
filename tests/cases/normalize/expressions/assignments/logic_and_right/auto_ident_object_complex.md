# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpObjLitVal$3 /*:unknown*/ = $(3);
  const tmpNestedComplexRhs /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$3 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$3 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
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
  const d = $( 3 );
  const e = {
    x: c,
    y: 2,
    z: d,
  };
  a = e;
  $( e );
}
else {
  $( b );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: { x: '1', y: '2', z: '3' }
 - 5: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
