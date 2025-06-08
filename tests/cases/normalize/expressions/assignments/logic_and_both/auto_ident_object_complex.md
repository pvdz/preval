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
const tmpNestedComplexRhs /*:object*/ /*truthy*/ = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpObjLitVal$5 = $(1);
  const tmpObjLitVal$7 = 2;
  const tmpObjLitVal$9 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


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
