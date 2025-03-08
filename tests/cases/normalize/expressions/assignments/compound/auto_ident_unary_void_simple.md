# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a *= void arg));
$(a, arg);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
a ** 0;
$(NaN);
$(NaN, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({ a: 999, b: 1000 } ** 0);
$(NaN);
$(NaN, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a *= void arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpBinBothRhs = undefined;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
a ** 0;
$( NaN );
$( NaN, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - 2: NaN, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
