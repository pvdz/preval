# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $(1) ? (40, 50, $(60)) : $($(100))) +
    (a = $(1) ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
let tmpBinBothLhs /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpBinBothLhs = $(60);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  tmpBinBothLhs = $(tmpCalleeParam$1);
}
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  const tmpClusterSSA_a /*:unknown*/ = $(60);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
  tmpBinBothLhs = $(60);
} else {
  tmpBinBothLhs = $($(100));
}
if ($(1)) {
  const tmpClusterSSA_a = $(60);
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(100));
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
if (a) {
  b = $( 60 );
}
else {
  const c = $( 100 );
  b = $( c );
}
const d = $( 1 );
if (d) {
  const e = $( 60 );
  const f = b + e;
  $( f );
  $( e );
}
else {
  const g = $( 100 );
  const h = $( g );
  const i = b + h;
  $( i );
  $( h );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 1
 - 4: 60
 - 5: 120
 - 6: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
