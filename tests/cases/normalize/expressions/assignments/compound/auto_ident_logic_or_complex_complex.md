# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(0)) || $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
let tmpClusterSSA_a /*:number*/ = 0;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpBinBothRhs) {
  tmpClusterSSA_a = a * tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$3);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $($(0));
let tmpClusterSSA_a = 0;
const a = { a: 999, b: 1000 };
if (tmpBinBothRhs) {
  tmpClusterSSA_a = a * tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  tmpClusterSSA_a = a * $($(2));
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(0)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCalleeParam$1 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$3);
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
let c = 0;
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  c = d * b;
  $( c );
}
else {
  const e = $( 2 );
  const f = $( e );
  c = d * f;
  $( c );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
