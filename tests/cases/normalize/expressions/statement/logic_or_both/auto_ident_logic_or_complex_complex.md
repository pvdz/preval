# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(2)) || $($(0)) || $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      $(tmpCalleeParam$5);
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$($(0))) {
  if (!$($(2))) {
    if (!$($(0))) {
      $($(2));
    }
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(2)) || $($(0)) || $($(2));
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
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 = $(0);
    tmpIfTest = $(tmpCalleeParam$3);
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$5 = $(2);
      $(tmpCalleeParam$5);
    }
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  const d = $( c );
  if (d) {

  }
  else {
    const e = $( 0 );
    const f = $( e );
    if (f) {

    }
    else {
      const g = $( 2 );
      $( g );
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
