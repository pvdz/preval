# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(0)) || $($(1)) || $($(2));
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
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_a$1) {
      $(tmpClusterSSA_a$1);
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
      $(tmpClusterSSA_a$3);
    }
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
    const tmpClusterSSA_a$1 = $($(1));
    if (tmpClusterSSA_a$1) {
      $(tmpClusterSSA_a$1);
    } else {
      $($($(2)));
    }
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
      a = $($(0)) || $($(1)) || $($(2));
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
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    $(a);
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(a);
    } else {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
    }
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
  const d = $( 0 );
  const e = $( d );
  if (e) {
    $( e );
  }
  else {
    const f = $( 1 );
    const g = $( f );
    if (g) {
      $( g );
    }
    else {
      const h = $( 2 );
      const i = $( h );
      $( i );
    }
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
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
