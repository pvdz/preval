# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(0)) || ($($(1)) && $($(2))) : $(200);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$3) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  }
} else {
  $(200);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($($(0))) {
    $(a);
  } else {
    if ($($(1))) {
      $($(2));
      $(a);
    } else {
      $(a);
    }
  }
} else {
  $(200);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(0)) || ($($(1)) && $($(2))) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$1 = $(1);
    const tmpIfTest$3 = $(tmpCalleeParam$1);
    if (tmpIfTest$3) {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  }
} else {
  $(200);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 0 );
  const d = $( c );
  if (d) {
    $( b );
  }
  else {
    const e = $( 1 );
    const f = $( e );
    if (f) {
      const g = $( 2 );
      $( g );
      $( b );
    }
    else {
      $( b );
    }
  }
}
else {
  $( 200 );
  $( b );
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
