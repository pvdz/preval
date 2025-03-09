# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Switch default > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $($(0)) || ($($(1)) && $($(2)));
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpIfTest$1) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
    $(a);
  } else {
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($($(1))) {
    $($(2));
    $(a);
  } else {
    $(a);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    $($(0)) || ($($(1)) && $($(2)));
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCalleeParam = $(0);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam$1);
  if (tmpIfTest$1) {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
    $(a);
  } else {
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    $( f );
    $( c );
  }
  else {
    $( c );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
