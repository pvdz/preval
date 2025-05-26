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
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$5);
}
const tmpCalleeParam$7 /*:unknown*/ = $(1);
let tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$7);
if (tmpClusterSSA_a$1) {
  const tmpCalleeParam$9 /*:unknown*/ = $(1);
  tmpClusterSSA_a$1 = $(tmpCalleeParam$9);
} else {
}
if (tmpClusterSSA_a$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$1;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a$1);
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
let tmpClusterSSA_a$1 = $($(1));
if (tmpClusterSSA_a$1) {
  tmpClusterSSA_a$1 = $($(1));
}
if (tmpClusterSSA_a$1) {
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
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
  d = $( e );
}
const f = $( 1 );
let g = $( f );
if (g) {
  const h = $( 1 );
  g = $( h );
}
if (g) {
  const i = d + g;
  $( i );
  $( g );
}
else {
  const j = $( 2 );
  const k = $( j );
  const l = d + k;
  $( l );
  $( k );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  let tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  let tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
}
const tmpBinBothLhs = a;
let tmpCalleeParam$7 = $(1);
a = $(tmpCalleeParam$7);
if (a) {
  let tmpCalleeParam$9 = $(1);
  a = $(tmpCalleeParam$9);
} else {
}
if (a) {
} else {
  let tmpCalleeParam$11 = $(2);
  a = $(tmpCalleeParam$11);
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


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
