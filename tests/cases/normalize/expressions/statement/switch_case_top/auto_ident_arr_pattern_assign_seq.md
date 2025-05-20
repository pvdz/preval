# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Switch case top > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    [x, y] = ($(x), $(y), [$(3), $(4)]);
}
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  $(a, tmpArrElement, tmpArrElement$1);
} else {
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(1);
  $(2);
  $(a, $(3), $(4));
} else {
  $(a, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( 1 );
  $( 2 );
  const e = $( 3 );
  const f = $( 4 );
  $( d, e, f );
}
else {
  $( d, 1, 2 );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
