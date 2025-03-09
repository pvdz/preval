# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(1)) && $($(1)) && $($(2));
  }
}
$(a);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
      $(tmpClusterSSA_a$3);
    } else {
      $(tmpClusterSSA_a$1);
    }
  } else {
    $(tmpClusterSSA_a);
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
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    const tmpClusterSSA_a$1 = $($(1));
    if (tmpClusterSSA_a$1) {
      $($($(2)));
    } else {
      $(tmpClusterSSA_a$1);
    }
  } else {
    $(tmpClusterSSA_a);
  }
} else {
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = $($(1)) && $($(1)) && $($(2));
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  } else {
    $(a);
  }
} else {
  $(a);
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
  const e = $( d );
  if (e) {
    const f = $( 1 );
    const g = $( f );
    if (g) {
      const h = $( 2 );
      const i = $( h );
      $( i );
    }
    else {
      $( g );
    }
  }
  else {
    $( e );
  }
}
else {
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````

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
 - 7: 2
 - 8: 2
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
