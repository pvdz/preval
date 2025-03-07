# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let tmpClusterSSA_a /*:number*/ = 0;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(2);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpBinBothRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
  tmpClusterSSA_a = a * tmpClusterSSA_tmpBinBothRhs$1;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
let tmpClusterSSA_a = 0;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  tmpClusterSSA_a = a * $(2);
  $(tmpClusterSSA_a);
} else {
  tmpClusterSSA_a = a * $($(100));
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpBinBothRhs = $(2);
} else {
  const tmpCalleeParam$1 = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
let b = 0;
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( 2 );
  b = c * d;
  $( b );
}
else {
  const e = $( 100 );
  const f = $( e );
  b = c * f;
  $( b );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
