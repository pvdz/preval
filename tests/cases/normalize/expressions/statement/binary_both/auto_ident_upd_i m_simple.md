# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
b-- + b--;
$(a, b);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a, -1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, -1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b-- + b--;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpBinBothLhs = tmpPostUpdArgIdent;
const tmpPostUpdArgIdent$1 = b;
b = b - 1;
const tmpBinBothRhs = tmpPostUpdArgIdent$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
