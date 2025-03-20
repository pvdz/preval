# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? $(2) : $($(100))) + ((10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  tmpBinBothLhs = $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  tmpBinBothRhs = $(2);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
if ($(30)) {
  tmpBinBothLhs = $(2);
} else {
  tmpBinBothLhs = $($(100));
}
let tmpBinBothRhs = undefined;
if ($(30)) {
  tmpBinBothRhs = $(2);
} else {
  tmpBinBothRhs = $($(100));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
let d = undefined;
const e = $( 30 );
if (e) {
  d = $( 2 );
}
else {
  const f = $( 100 );
  d = $( f );
}
a + d;
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
 - 1: 30
 - 2: 2
 - 3: 30
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
