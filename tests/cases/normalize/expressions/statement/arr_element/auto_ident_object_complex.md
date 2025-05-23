# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } + { x: $(1), y: 2, z: $(3) });
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpObjLitVal$5 /*:unknown*/ = $(1);
const tmpObjLitVal$9 /*:unknown*/ = $(3);
const tmpBinBothLhs /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpBinBothRhs /*:object*/ = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$9 = $(3);
({ x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 } + { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = $( 1 );
const d = $( 3 );
const e = {
  x: a,
  y: 2,
  z: b,
};
const f = {
  x: c,
  y: 2,
  z: d,
};
e + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
