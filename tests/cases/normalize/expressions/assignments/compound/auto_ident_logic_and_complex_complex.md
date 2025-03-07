# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
let tmpClusterSSA_a /*:number*/ = 0;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$3);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  tmpClusterSSA_a = a * tmpBinBothRhs;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $($(1));
let tmpClusterSSA_a = 0;
const a = { a: 999, b: 1000 };
if (tmpBinBothRhs) {
  tmpClusterSSA_a = a * $($(2));
  $(tmpClusterSSA_a);
} else {
  tmpClusterSSA_a = a * tmpBinBothRhs;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$3);
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
let c = 0;
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  const e = $( 2 );
  const f = $( e );
  c = d * f;
  $( c );
}
else {
  c = d * b;
  $( c );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
