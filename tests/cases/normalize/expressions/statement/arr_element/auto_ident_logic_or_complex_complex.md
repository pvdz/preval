# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(2))) + ($($(0)) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$1);
}
const tmpCalleeParam$3 /*:unknown*/ = $(0);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = $($(0));
if (!tmpBinBothLhs) {
  tmpBinBothLhs = $($(2));
}
let tmpBinBothRhs = $($(0));
if (!tmpBinBothRhs) {
  tmpBinBothRhs = $($(2));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
const d = $( 0 );
let e = $( d );
if (e) {

}
else {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(0);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
} else {
  let tmpCalleeParam$1 = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$1);
}
let tmpCalleeParam$3 = $(0);
let tmpBinBothRhs = $(tmpCalleeParam$3);
if (tmpBinBothRhs) {
} else {
  let tmpCalleeParam$5 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$5);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
