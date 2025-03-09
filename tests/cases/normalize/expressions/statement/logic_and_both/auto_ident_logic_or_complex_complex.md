# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(2))) && ($($(0)) || $($(2)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpIfTest = $(tmpCalleeParam$1);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    $(tmpCalleeParam$5);
    $(a);
  }
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $($(0));
if (!tmpIfTest) {
  tmpIfTest = $($(2));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($($(0))) {
    $(a);
  } else {
    $($(2));
    $(a);
  }
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(2))) && ($($(0)) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpIfTest = $(tmpCalleeParam$1);
}
if (tmpIfTest) {
  const tmpCalleeParam$3 = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam$3);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$5 = $(2);
    $(tmpCalleeParam$5);
    $(a);
  }
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( d );
  }
  else {
    const g = $( 2 );
    $( g );
    $( d );
  }
}
else {
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: 0
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
