# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, 60) : $($(100))) + ($(1) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
let tmpBinBothRhs /*:unknown*/ = 60;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = 60;
if (!$(1)) {
  tmpBinBothLhs = $($(100));
}
let tmpBinBothRhs = 60;
if (!$(1)) {
  tmpBinBothRhs = $($(100));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
let d = 60;
const e = $( 1 );
if (e) {

}
else {
  const f = $( 100 );
  d = $( f );
}
a + d;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
