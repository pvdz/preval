# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_a /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
if ($(30)) {
  const tmpClusterSSA_a = $(2);
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(100));
  $(tmpBinBothLhs + tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 30 );
if (b) {
  const c = $( 2 );
  const d = a + c;
  $( d );
  $( c );
}
else {
  const e = $( 100 );
  const f = $( e );
  const g = a + f;
  $( g );
  $( f );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 30
 - 3: 2
 - 4: 102
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
