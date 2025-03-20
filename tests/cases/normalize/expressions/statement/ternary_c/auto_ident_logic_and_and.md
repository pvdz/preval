# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Ternary c > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $($(1)) && $($(1)) && $($(2));
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
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  } else {
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
  if ($($(1))) {
    if ($($(1))) {
      $($(2));
      $(a);
    } else {
      $(a);
    }
  } else {
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
  const d = $( c );
  if (d) {
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
  else {
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
 - 3: 1
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
