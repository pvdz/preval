# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(100) + void arg;
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
tmpBinBothLhs + undefined;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100) + undefined;
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(100) + void arg;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpBinBothRhs = undefined;
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
a + undefined;
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
 - 1: 100
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
