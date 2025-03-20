# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Binary left > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) + $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  tmpBinBothLhs = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
const tmpBinBothRhs /*:unknown*/ = $(100);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
if ($(1)) {
  tmpBinBothLhs = $(60);
} else {
  tmpBinBothLhs = $($(100));
}
tmpBinBothLhs + $(100);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
const d = $( 100 );
a + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
