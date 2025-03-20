# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic and left > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($($(0)) || $($(1)) || $($(2))) && $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
    $(a);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(100);
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
const tmpIfTest = $($(0));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  if ($($(1))) {
    $(100);
    $(a);
  } else {
    if ($($(2))) {
      $(100);
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
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( 100 );
  $( c );
}
else {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    $( 100 );
    $( c );
  }
  else {
    const f = $( 2 );
    const g = $( f );
    if (g) {
      $( 100 );
      $( c );
    }
    else {
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
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
