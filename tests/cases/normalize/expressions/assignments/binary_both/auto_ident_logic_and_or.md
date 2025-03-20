# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = ($($(1)) && $($(1))) || $($(2))) + (a = ($($(1)) && $($(1))) || $($(2)))
);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
let tmpBinBothLhs /*:unknown*/ = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$5);
  tmpBinBothLhs = tmpClusterSSA_a$1;
}
const tmpCalleeParam$7 /*:unknown*/ = $(1);
let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$7);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$9 /*:unknown*/ = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$9);
} else {
}
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$11 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$11);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
let tmpBinBothLhs = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  tmpBinBothLhs = $($(2));
}
let tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  tmpClusterSSA_a = $($(1));
}
if (tmpClusterSSA_a) {
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$2 = $($(2));
  $(tmpBinBothLhs + tmpClusterSSA_a$2);
  $(tmpClusterSSA_a$2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
let d = undefined;
if (b) {
  d = b;
}
else {
  const e = $( 2 );
  const f = $( e );
  d = f;
}
const g = $( 1 );
let h = $( g );
if (h) {
  const i = $( 1 );
  h = $( i );
}
if (h) {
  const j = d + h;
  $( j );
  $( h );
}
else {
  const k = $( 2 );
  const l = $( k );
  const m = d + l;
  $( m );
  $( l );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
