# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(0)) || 2;
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
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
  } else {
    $(2);
  }
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpClusterSSA_a = $($(0));
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
  } else {
    $(2);
  }
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
  const d = $( 0 );
  const e = $( d );
  if (e) {
    $( e );
  }
  else {
    $( 2 );
  }
}
else {
  const f = {
    a: 999,
    b: 1000,
  };
  $( f );
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
 - 3: 0
 - 4: 0
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
