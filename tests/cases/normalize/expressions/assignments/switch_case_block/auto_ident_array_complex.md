# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = [$(1), 2, $(3)];
  }
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(1);
  const tmpArrElement$3 /*:unknown*/ = $(3);
  const tmpClusterSSA_a /*:array*/ /*truthy*/ = [tmpArrElement, 2, tmpArrElement$3];
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpArrElement = $(1);
  const tmpArrElement$3 = $(3);
  $([tmpArrElement, 2, tmpArrElement$3]);
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( 1 );
  const e = $( 3 );
  const f = [ d, 2, e ];
  $( f );
}
else {
  const g = {
    a: 999,
    b: 1000,
  };
  $( g );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
  $(a);
} else {
  $(a);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 3
 - 5: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
