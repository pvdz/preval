# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $(1) ? (40, 50, 60) : $($(100))) + (a = $(1) ? (40, 50, 60) : $($(100)))
);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  tmpBinBothLhs = $(tmpCalleeParam$1);
}
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 60;
  $(tmpClusterSSA_tmpCalleeParam);
  $(60);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
let tmpBinBothLhs = 60;
if (!tmpIfTest) {
  tmpBinBothLhs = $($(100));
}
if ($(1)) {
  $(tmpBinBothLhs + 60);
  $(60);
} else {
  const a = $($(100));
  $(tmpBinBothLhs + a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 60;
if (a) {

}
else {
  const c = $( 100 );
  b = $( c );
}
const d = $( 1 );
if (d) {
  const e = b + 60;
  $( e );
  $( 60 );
}
else {
  const f = $( 100 );
  const g = $( f );
  const h = b + g;
  $( h );
  $( g );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 120
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
