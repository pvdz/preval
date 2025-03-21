# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Logic and both > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) && $(1) + $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpIfTest /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpBinBothLhs$1 /*:unknown*/ = $(1);
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  tmpBinBothLhs$1 + tmpBinBothRhs$1;
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) + $(2);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1) + $(2);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( 1 );
  const f = $( 2 );
  e + f;
  $( d );
}
else {
  $( d );
}
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
