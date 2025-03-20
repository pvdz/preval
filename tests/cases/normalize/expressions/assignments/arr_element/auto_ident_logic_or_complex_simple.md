# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) + (a = $($(0)) || 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpBinBothLhs /*:unknown*/ = 2;
if (a) {
  tmpBinBothLhs = a;
} else {
}
const tmpCalleeParam$3 /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + 2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
let tmpBinBothLhs = 2;
if (a) {
  tmpBinBothLhs = a;
}
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  $(tmpBinBothLhs + 2);
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
let c = 2;
if (b) {
  c = b;
}
const d = $( 0 );
const e = $( d );
if (e) {
  const f = c + e;
  $( f );
  $( e );
}
else {
  const g = c + 2;
  $( g );
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 4
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
