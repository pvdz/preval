# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Compound > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  } else {
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothRhs = $($(1));
if (tmpBinBothRhs) {
  tmpBinBothRhs = $($(1));
  if (tmpBinBothRhs) {
    tmpBinBothRhs = $($(2));
  }
}
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCalleeParam$1 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$1);
if (tmpBinBothRhs) {
  const tmpCalleeParam$3 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$3);
  if (tmpBinBothRhs) {
    const tmpCalleeParam$5 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$5);
  } else {
  }
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = {
  a: 999,
  b: 1000,
};
const f = e * b;
$( f );
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: NaN
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
