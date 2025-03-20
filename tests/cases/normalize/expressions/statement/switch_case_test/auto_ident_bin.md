# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Switch case test > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1) + $(2):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
tmpBinBothLhs$1 + tmpBinBothRhs$1;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1) + $(2);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = $( 2 );
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
