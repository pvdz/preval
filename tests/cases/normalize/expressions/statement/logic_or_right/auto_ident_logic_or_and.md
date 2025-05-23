# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Logic or right > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($(0)) || ($($(1)) && $($(2)));
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
    const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
      $(a);
    } else {
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
      $($(2));
      $(a);
    } else {
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
      const g = $( 2 );
      $( g );
      $( b );
    }
    else {
      $( b );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
  $(a);
} else {
  let tmpCalleeParam = $(0);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(a);
  } else {
    let tmpCalleeParam$1 = $(1);
    const tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      let tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  }
}
`````


## Todos triggered


None


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
