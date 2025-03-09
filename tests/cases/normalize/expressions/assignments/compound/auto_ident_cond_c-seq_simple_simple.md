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
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:number*/ = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpBinBothRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_a$3 /*:number*/ = a * tmpClusterSSA_tmpBinBothRhs$1;
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_a$1 = a * $(2);
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  const tmpClusterSSA_a$3 = a * $($(100));
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
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
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  const d = b * c;
  $( d );
  $( d );
}
else {
  const e = $( 100 );
  const f = $( e );
  const g = b * f;
  $( g );
  $( g );
}
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
