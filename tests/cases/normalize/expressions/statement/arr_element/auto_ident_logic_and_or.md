# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(($($(1)) && $($(1))) || $($(2))) + (($($(1)) && $($(1))) || $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
} else {
}
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$3);
}
const tmpCalleeParam$5 /*:unknown*/ = $(1);
let tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$5);
if (tmpBinBothRhs) {
  const tmpCalleeParam$7 /*:unknown*/ = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$7);
} else {
}
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$9 /*:unknown*/ = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$9);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = $($(1));
if (tmpBinBothLhs) {
  tmpBinBothLhs = $($(1));
}
if (!tmpBinBothLhs) {
  tmpBinBothLhs = $($(2));
}
let tmpBinBothRhs = $($(1));
if (tmpBinBothRhs) {
  tmpBinBothRhs = $($(1));
}
if (!tmpBinBothRhs) {
  tmpBinBothRhs = $($(2));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
const e = $( 1 );
let f = $( e );
if (f) {
  const g = $( 1 );
  f = $( g );
}
if (f) {

}
else {
  const h = $( 2 );
  f = $( h );
}
b + f;
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpBinBothLhs = $(tmpCalleeParam);
if (tmpBinBothLhs) {
  let tmpCalleeParam$1 = $(1);
  tmpBinBothLhs = $(tmpCalleeParam$1);
} else {
}
if (tmpBinBothLhs) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpBinBothLhs = $(tmpCalleeParam$3);
}
let tmpCalleeParam$5 = $(1);
let tmpBinBothRhs = $(tmpCalleeParam$5);
if (tmpBinBothRhs) {
  let tmpCalleeParam$7 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$7);
} else {
}
if (tmpBinBothRhs) {
} else {
  let tmpCalleeParam$9 = $(2);
  tmpBinBothRhs = $(tmpCalleeParam$9);
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
