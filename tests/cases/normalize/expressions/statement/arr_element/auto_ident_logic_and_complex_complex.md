# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(2))) + ($($(1)) && $($(2)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$1);
} else {
}
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = $($(1));
if (tmpBinBothLhs) {
  tmpBinBothLhs = $($(2));
}
let tmpBinBothRhs = $($(1));
if (tmpBinBothRhs) {
  tmpBinBothRhs = $($(2));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($($(1)) && $($(2))) + ($($(1)) && $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  const tmpCalleeParam$1 = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$1);
} else {
}
const tmpCalleeParam$3 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
  const tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 2 );
  b = $( c );
}
const d = $( 1 );
let e = $( d );
if (e) {
  const f = $( 2 );
  e = $( f );
}
b + e;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
