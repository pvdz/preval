# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Ternary c > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(100);
} else {
  let tmpIfTest$1 = $($(1));
  if (tmpIfTest$1) {
    tmpIfTest$1 = $($(1));
  }
  if (!tmpIfTest$1) {
    $($(2));
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCalleeParam = $(1);
  let tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 100 );
}
else {
  const b = $( 1 );
  let c = $( b );
  if (c) {
    const d = $( 1 );
    c = $( d );
  }
  if (c) {

  }
  else {
    const e = $( 2 );
    $( e );
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
