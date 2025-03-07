# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && 2) + (a = $($(1)) && 2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpBinBothLhs /*:unknown*/ = 2;
if (a) {
} else {
  tmpBinBothLhs = a;
}
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpClusterSSA_a) {
  tmpClusterSSA_a = 2;
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + 2;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
let tmpBinBothLhs = 2;
if (!a) {
  tmpBinBothLhs = a;
}
let tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  tmpClusterSSA_a = 2;
  $(tmpBinBothLhs + 2);
} else {
  $(tmpBinBothLhs + tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && 2) + (a = $($(1)) && 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  a = 2;
} else {
}
let tmpBinBothLhs = a;
const tmpCalleeParam$3 = $(1);
a = $(tmpCalleeParam$3);
if (a) {
  a = 2;
} else {
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
const b = $( a );
let c = 2;
if (b) {

}
else {
  c = b;
}
const d = $( 1 );
let e = $( d );
if (e) {
  e = 2;
  const f = c + 2;
  $( f );
}
else {
  const g = c + e;
  $( g );
}
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 4
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
