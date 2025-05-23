# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $(1) ? 2 : $($(100))):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(1)) {
  $(2);
} else {
  $($($(100)));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 2;
} else {
  let tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
const tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
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
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
