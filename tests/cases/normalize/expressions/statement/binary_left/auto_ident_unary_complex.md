# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Binary left > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
typeof $(x) + $(100);
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
$coerce(tmpBinBothRhs, `plustr`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$coerce($(100), `plustr`);
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
typeof $(x) + $(100);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpBinBothLhs = typeof tmpUnaryArg;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 100 );
$coerce( a, "plustr" );
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
