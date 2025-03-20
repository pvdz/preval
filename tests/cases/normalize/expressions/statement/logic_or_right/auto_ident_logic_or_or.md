# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic or right > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($(0)) || $($(1)) || $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(a);
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
      $(a);
    }
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
  if ($($(0))) {
    $(a);
  } else {
    if ($($(1))) {
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
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = $( 0 );
  const d = $( c );
  if (d) {
    $( b );
  }
  else {
    const e = $( 1 );
    const f = $( e );
    if (f) {
      $( b );
    }
    else {
      const g = $( 2 );
      $( g );
      $( b );
    }
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
