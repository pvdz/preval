# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || ($($(1)) && $($(2)))) && ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
  } else {
  }
}
if (tmpIfTest) {
  const tmpCalleeParam$5 /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(1);
    const tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$7);
    if (tmpIfTest$3) {
      const tmpCalleeParam$9 /*:unknown*/ = $(2);
      $(tmpCalleeParam$9);
    } else {
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $($(0));
if (!tmpIfTest) {
  tmpIfTest = $($(1));
  if (tmpIfTest) {
    tmpIfTest = $($(2));
  }
}
if (tmpIfTest) {
  if (!$($(0))) {
    if ($($(1))) {
      $($(2));
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || ($($(1)) && $($(2)))) && ($($(0)) || ($($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
  } else {
  }
}
if (tmpIfTest) {
  const tmpCalleeParam$5 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$5);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpIfTest$3 = $(tmpCalleeParam$7);
    if (tmpIfTest$3) {
      const tmpCalleeParam$9 = $(2);
      $(tmpCalleeParam$9);
    } else {
    }
  }
} else {
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  const e = $( 0 );
  const f = $( e );
  if (f) {

  }
  else {
    const g = $( 1 );
    const h = $( g );
    if (h) {
      const i = $( 2 );
      $( i );
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
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
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
