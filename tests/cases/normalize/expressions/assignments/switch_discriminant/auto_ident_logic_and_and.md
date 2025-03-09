# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $($(1)) && $($(1)) && $($(2)))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(100);
    $(tmpClusterSSA_a$1);
  } else {
    $(100);
    $(tmpClusterSSA_a);
  }
} else {
  $(100);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    const tmpClusterSSA_a$1 = $($(2));
    $(100);
    $(tmpClusterSSA_a$1);
  } else {
    $(100);
    $(tmpClusterSSA_a);
  }
} else {
  $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = $($(1)) && $($(1)) && $($(2)));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( 100 );
    $( f );
  }
  else {
    $( 100 );
    $( d );
  }
}
else {
  $( 100 );
  $( b );
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
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
