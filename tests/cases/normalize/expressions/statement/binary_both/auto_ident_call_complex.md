# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)(1) + $($)(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpBinBothLhs /*:unknown*/ = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 /*:unknown*/ = $($);
const tmpBinBothRhs /*:unknown*/ = tmpCallComplexCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpBinBothLhs = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 = $($);
tmpBinBothLhs + tmpCallComplexCallee$1(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
const c = $( $ );
const d = c( 1 );
b + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
const tmpBinBothLhs = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 = $($);
const tmpBinBothRhs = tmpCallComplexCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
