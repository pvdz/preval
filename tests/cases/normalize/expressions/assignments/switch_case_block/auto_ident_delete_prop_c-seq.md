# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = delete ($(1), $(2), $(arg)).y;
  }
}
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
const arg /*:object*/ = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
  $(tmpClusterSSA_a, arg);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  $(delete tmpDeleteObj.y, arg);
} else {
  $({ a: 999, b: 1000 }, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { y: 1 };
if (c) {
  $( 1 );
  $( 2 );
  const e = $( d );
  const f = delete e.y;
  $( f, d );
}
else {
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, d );
}
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
 - 4: 2
 - 5: { y: '1' }
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
