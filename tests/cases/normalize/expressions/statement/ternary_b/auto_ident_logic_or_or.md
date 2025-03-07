# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(0)) || $($(1)) || $($(2)) : $(200);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    }
  }
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if (!$($(0))) {
    if (!$($(1))) {
      $($(2));
    }
  }
} else {
  $(200);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(0)) || $($(1)) || $($(2)) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  let tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
    } else {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    }
  }
} else {
  $(200);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 0 );
  const c = $( b );
  if (c) {

  }
  else {
    const d = $( 1 );
    const e = $( d );
    if (e) {

    }
    else {
      const f = $( 2 );
      $( f );
    }
  }
}
else {
  $( 200 );
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
