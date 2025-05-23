# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + (a = $($(0)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$3);
}
const tmpCalleeParam$5 /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$5);
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$7);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
let tmpBinBothLhs = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  tmpBinBothLhs = $($(2));
}
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(2));
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  c = $( d );
}
const e = $( 0 );
const f = $( e );
if (f) {
  const g = c + f;
  $( g );
  $( f );
}
else {
  const h = $( 2 );
  const i = $( h );
  const j = c + i;
  $( j );
  $( i );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: 4
 - 10: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
