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
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(0);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(a);
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      $(tmpCalleeParam$5);
      $(a);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($($(2))) {
    $(a);
  } else {
    if ($($(0))) {
      $(a);
    } else {
      $($(2));
      $(a);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
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
  const d = $( 2 );
  const e = $( d );
  if (e) {
    $( c );
  }
  else {
    const f = $( 0 );
    const g = $( f );
    if (g) {
      $( c );
    }
    else {
      const h = $( 2 );
      $( h );
      $( c );
    }
  }
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
