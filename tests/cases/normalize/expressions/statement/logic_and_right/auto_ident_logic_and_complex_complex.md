# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($(1)) && $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    $(tmpCalleeParam$1);
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($($(1))) {
    $($(2));
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && $($(1)) && $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(2);
    $(tmpCalleeParam$1);
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
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
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
    $( b );
  }
  else {
    $( b );
  }
}
else {
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
