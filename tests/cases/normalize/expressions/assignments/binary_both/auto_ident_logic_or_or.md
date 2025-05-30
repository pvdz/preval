# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) + (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  }
}
const tmpBinBothLhs /*:unknown*/ = a;
const tmpCalleeParam$7 /*:unknown*/ = $(0);
let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$7);
if (tmpClusterSSA_a) {
} else {
  const tmpCalleeParam$9 /*:unknown*/ = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$9);
  if (tmpClusterSSA_a) {
  } else {
    const tmpCalleeParam$11 /*:unknown*/ = $(2);
    tmpClusterSSA_a = $(tmpCalleeParam$11);
  }
}
const tmpBinBothRhs /*:unknown*/ = tmpClusterSSA_a;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (!a) {
    a = $($(2));
  }
}
const tmpBinBothLhs = a;
let tmpClusterSSA_a = $($(0));
if (!tmpClusterSSA_a) {
  tmpClusterSSA_a = $($(1));
  if (!tmpClusterSSA_a) {
    tmpClusterSSA_a = $($(2));
  }
}
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
const e = b;
const f = $( 0 );
let g = $( f );
if (g) {

}
else {
  const h = $( 1 );
  g = $( h );
  if (g) {

  }
  else {
    const i = $( 2 );
    g = $( i );
  }
}
const j = g;
const k = e + j;
$( k );
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
