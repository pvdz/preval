# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[[$(1), 2, $(3)]];
$(a);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const obj /*:object*/ = {};
const tmpCompProp /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const obj = {};
const tmpCompProp = [tmpArrElement, 2, tmpArrElement$3];
obj[tmpCompProp];
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[[$(1), 2, $(3)]];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpCompProp = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {};
const d = [ a, 2, b ];
c[ d ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

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
