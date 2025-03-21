# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[{ x: $(1), y: 2, z: $(3) }];
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const obj /*:object*/ = {};
const tmpCompProp /*:object*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const obj = {};
const tmpCompProp = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
obj[tmpCompProp];
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {};
const d = {
  x: a,
  y: 2,
  z: b,
};
c[ d ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
