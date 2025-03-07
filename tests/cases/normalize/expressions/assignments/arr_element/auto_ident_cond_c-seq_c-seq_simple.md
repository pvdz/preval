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
let a /*:unknown*/ = undefined;
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
  a = $(60);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$3);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
  tmpBinBothLhs = $(60);
} else {
  tmpBinBothLhs = $($(100));
}
if ($(30)) {
  a = $(60);
  $(tmpBinBothLhs + a);
} else {
  a = $($(100));
  $(tmpBinBothLhs + a);
}
$(a);
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
let a = undefined;
const b = $( 30 );
let c = undefined;
if (b) {
  const d = $( 60 );
  c = d;
}
else {
  const e = $( 100 );
  const f = $( e );
  c = f;
}
const g = $( 30 );
if (g) {
  a = $( 60 );
  const h = c + a;
  $( h );
}
else {
  const i = $( 100 );
  a = $( i );
  const j = c + a;
  $( j );
}
$( a );
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
