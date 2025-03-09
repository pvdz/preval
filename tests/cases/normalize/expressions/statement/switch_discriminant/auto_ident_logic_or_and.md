# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || ($($(1)) && $($(2)))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpSwitchDisc /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpSwitchDisc) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpSwitchDisc /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpSwitchDisc) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
    $(100);
    $(a);
  } else {
    $(100);
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $($(0));
const a = { a: 999, b: 1000 };
if (tmpSwitchDisc) {
  $(100);
  $(a);
} else {
  if ($($(1))) {
    $($(2));
    $(100);
    $(a);
  } else {
    $(100);
    $(a);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(0)) || ($($(1)) && $($(2)));
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
const tmpCalleeParam = $(0);
let tmpSwitchDisc = $(tmpCalleeParam);
if (tmpSwitchDisc) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam$1 = $(1);
  tmpSwitchDisc = $(tmpCalleeParam$1);
  if (tmpSwitchDisc) {
    const tmpCalleeParam$3 = $(2);
    tmpSwitchDisc = $(tmpCalleeParam$3);
    $(100);
    $(a);
  } else {
    $(100);
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( 100 );
  $( c );
}
else {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    $( f );
    $( 100 );
    $( c );
  }
  else {
    $( 100 );
    $( c );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
