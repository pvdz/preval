# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = (1, 2, $(b)).c;
  }
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpAssignRhsProp /*:unknown*/ = $(b);
  const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
  $(tmpClusterSSA_a, b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const b = { c: 1 };
if (tmpIfTest) {
  $($(b).c, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { c: 1 };
if (c) {
  const e = $( d );
  const f = e.c;
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { c: '1' }
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
