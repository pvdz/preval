# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothRhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$1);
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = $($(1));
if (tmpBinBothRhs) {
  tmpBinBothRhs = $($(2));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
let c = $( b );
if (c) {
  const d = $( 2 );
  c = $( d );
}
a + c;
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
const tmpBinBothLhs = $(100);
let tmpCalleeParam = $(1);
let tmpBinBothRhs = $(tmpCalleeParam);
if (tmpBinBothRhs) {
  let tmpCalleeParam$1 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$1);
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
