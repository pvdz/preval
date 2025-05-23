# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) + (a = $($(1)) && $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$3);
} else {
  tmpBinBothLhs = a;
}
const tmpCalleeParam$5 /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$5);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$7);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$1;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a$1);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
let tmpBinBothLhs = undefined;
if (a) {
  tmpBinBothLhs = $($(2));
} else {
  tmpBinBothLhs = a;
}
const tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  const tmpClusterSSA_a$1 = $($(2));
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  c = $( d );
}
else {
  c = b;
}
const e = $( 1 );
const f = $( e );
if (f) {
  const g = $( 2 );
  const h = $( g );
  const i = c + h;
  $( i );
  $( h );
}
else {
  const j = c + f;
  $( j );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  let tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
} else {
}
const tmpBinBothLhs = a;
let tmpCalleeParam$5 = $(1);
a = $(tmpCalleeParam$5);
if (a) {
  let tmpCalleeParam$7 = $(2);
  a = $(tmpCalleeParam$7);
} else {
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
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: 4
 - 10: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
