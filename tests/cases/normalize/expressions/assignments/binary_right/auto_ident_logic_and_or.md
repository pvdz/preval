# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Binary right > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$5);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let a = $($(1));
if (a) {
  a = $($(1));
}
if (a) {
  $(tmpBinBothLhs + a);
  $(a);
} else {
  const tmpClusterSSA_a = $($(2));
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
let c = $( b );
if (c) {
  const d = $( 1 );
  c = $( d );
}
if (c) {
  const e = a + c;
  $( e );
  $( c );
}
else {
  const f = $( 2 );
  const g = $( f );
  const h = a + g;
  $( h );
  $( g );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 101
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
