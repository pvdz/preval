# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] + [$(1), 2, $(3)];
$(a);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(1);
const tmpArrElement$9 /*:unknown*/ = $(3);
const tmpBinBothLhs /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
const tmpBinBothRhs /*:array*/ = [tmpArrElement$5, 2, tmpArrElement$9];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(1);
const tmpArrElement$9 = $(3);
[tmpArrElement, 2, tmpArrElement$3] + [tmpArrElement$5, 2, tmpArrElement$9];
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] + [$(1), 2, $(3)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpBinBothLhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpArrElement$5 = $(1);
const tmpArrElement$7 = 2;
const tmpArrElement$9 = $(3);
const tmpBinBothRhs = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = $( 1 );
const d = $( 3 );
const e = [ a, 2, b ];
const f = [ c, 2, d ];
e + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

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
