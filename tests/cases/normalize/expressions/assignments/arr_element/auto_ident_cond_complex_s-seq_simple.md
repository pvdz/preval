# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident cond complex s-seq simple
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
let tmpBinBothLhs /*:unknown*/ = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  tmpBinBothLhs = tmpClusterSSA_a;
}
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 60;
  $(tmpClusterSSA_tmpCalleeParam);
  $(60);
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
let tmpBinBothLhs = 60;
if (!tmpIfTest) {
  tmpBinBothLhs = $($(100));
}
if ($(1)) {
  $(tmpBinBothLhs + 60);
  $(60);
} else {
  const tmpClusterSSA_a$1 = $($(100));
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) + (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
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
  const d = $( c );
  b = d;
}
const e = $( 1 );
if (e) {
  const f = b + 60;
  $( f );
  $( 60 );
}
else {
  const g = $( 100 );
  const h = $( g );
  const i = b + h;
  $( i );
  $( h );
}
`````

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
