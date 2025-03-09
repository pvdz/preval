# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(0)) || 2));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + 2;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(2);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const a = $($(0));
if (a) {
  $(tmpBinBothLhs + a);
  $(a);
} else {
  $(tmpBinBothLhs + 2);
  $(2);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($(0)) || 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
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
const b = $( 0 );
const c = $( b );
if (c) {
  const d = a + c;
  $( d );
  $( c );
}
else {
  const e = a + 2;
  $( e );
  $( 2 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 102
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
