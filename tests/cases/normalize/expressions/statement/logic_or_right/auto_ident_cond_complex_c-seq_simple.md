# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or right > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(60);
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
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($(1)) {
    $(60);
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
$(100) || ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(60);
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
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = $( 1 );
  if (c) {
    $( 60 );
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
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
