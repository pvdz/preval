# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($(1) + $(2)).a;
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpCompObj /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(1);
(tmpBinBothLhs + $(2)).a;
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($(1) + $(2)).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCompObj = tmpBinBothLhs + tmpBinBothRhs;
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
c.a;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
