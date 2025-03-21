# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Binary both > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) + ($(1) + $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$3 /*:unknown*/ = $(1);
const tmpBinBothRhs$3 /*:unknown*/ = $(2);
tmpBinBothLhs$3 + tmpBinBothRhs$3;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1) + $(2);
$(1) + $(2);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
a + b;
const c = $( 1 );
const d = $( 2 );
c + d;
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
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
