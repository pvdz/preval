# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) && (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(3);
const tmpObjLitVal$5 /*:unknown*/ = $(1);
const tmpObjLitVal$9 /*:unknown*/ = $(3);
const tmpNestedComplexRhs /*:object*/ = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$9 = $(3);
const tmpNestedComplexRhs = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = $( 1 );
const b = $( 3 );
const c = {
  x: a,
  y: 2,
  z: b,
};
$( c );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: { x: '1', y: '2', z: '3' }
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
