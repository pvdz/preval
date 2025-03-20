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
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpObjLitVal$3 /*:unknown*/ = $(3);
  const tmpNestedComplexRhs /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$3 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 1 );
  const c = $( 3 );
  const d = {
    x: b,
    y: 2,
    z: c,
  };
  $( d );
  $( d );
}
else {
  $( a );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
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
