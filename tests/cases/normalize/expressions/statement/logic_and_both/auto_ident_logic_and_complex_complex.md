# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) && $($(1)) && $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      $(tmpCalleeParam$5);
      $(a);
    } else {
      $(a);
    }
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
const tmpIfTest = $($(1));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($($(2))) {
    if ($($(1))) {
      $($(2));
      $(a);
    } else {
      $(a);
    }
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
const a = $( 1 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( 2 );
  const e = $( d );
  if (e) {
    const f = $( 1 );
    const g = $( f );
    if (g) {
      const h = $( 2 );
      $( h );
      $( c );
    }
    else {
      $( c );
    }
  }
  else {
    $( c );
  }
}
else {
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
