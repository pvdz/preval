# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(1) ? 2 : $($(100));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    $(tmpCalleeParam);
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  if ($(1)) {
    $(a);
  } else {
    $($(100));
    $(a);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(1) ? 2 : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = $( 1 );
  if (c) {
    $( b );
  }
  else {
    const d = $( 100 );
    $( d );
    $( b );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
