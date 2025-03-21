# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(1)) || $($(2)) || $($(0)) || $($(1)) || $($(2));
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
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(a);
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(0);
      const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$5);
      if (tmpClusterSSA_tmpIfTest$3) {
        $(a);
      } else {
        const tmpCalleeParam$7 /*:unknown*/ = $(1);
        const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$7);
        if (tmpClusterSSA_tmpIfTest$5) {
          $(a);
        } else {
          const tmpCalleeParam$9 /*:unknown*/ = $(2);
          $(tmpCalleeParam$9);
          $(a);
        }
      }
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
  if ($($(1))) {
    $(a);
  } else {
    if ($($(2))) {
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
  const d = $( 1 );
  const e = $( d );
  if (e) {
    $( c );
  }
  else {
    const f = $( 2 );
    const g = $( f );
    if (g) {
      $( c );
    }
    else {
      const h = $( 0 );
      const i = $( h );
      if (i) {
        $( c );
      }
      else {
        const j = $( 1 );
        const k = $( j );
        if (k) {
          $( c );
        }
        else {
          const l = $( 2 );
          $( l );
          $( c );
        }
      }
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
