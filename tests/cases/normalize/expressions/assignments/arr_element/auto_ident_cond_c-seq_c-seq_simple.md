# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) +
    (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let tmpBinBothLhs /*:unknown*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_a /*:unknown*/ = $(60);
  tmpBinBothLhs = tmpClusterSSA_a;
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  tmpBinBothLhs = tmpClusterSSA_a$1;
}
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  const tmpClusterSSA_a$2 /*:unknown*/ = $(60);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$2;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a$2);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpClusterSSA_a$4 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$4;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$4);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
  tmpBinBothLhs = $(60);
} else {
  tmpBinBothLhs = $($(100));
}
if ($(30)) {
  const tmpClusterSSA_a$2 = $(60);
  $(tmpBinBothLhs + tmpClusterSSA_a$2);
  $(tmpClusterSSA_a$2);
} else {
  const tmpClusterSSA_a$4 = $($(100));
  $(tmpBinBothLhs + tmpClusterSSA_a$4);
  $(tmpClusterSSA_a$4);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) + (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(60);
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
const a = $( 30 );
let b = undefined;
if (a) {
  const c = $( 60 );
  b = c;
}
else {
  const d = $( 100 );
  const e = $( d );
  b = e;
}
const f = $( 30 );
if (f) {
  const g = $( 60 );
  const h = b + g;
  $( h );
  $( g );
}
else {
  const i = $( 100 );
  const j = $( i );
  const k = b + j;
  $( k );
  $( j );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 30
 - 4: 60
 - 5: 120
 - 6: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
