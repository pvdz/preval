# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Logic and both > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(1)) && $($(2)) && $($(1)) && $($(1)) && $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(tmpCalleeParam$5);
      if (tmpClusterSSA_tmpIfTest$3) {
        const tmpCalleeParam$7 /*:unknown*/ = $(1);
        const tmpClusterSSA_tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam$7);
        if (tmpClusterSSA_tmpIfTest$5) {
          const tmpCalleeParam$9 /*:unknown*/ = $(2);
          $(tmpCalleeParam$9);
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
  if ($($(1))) {
    if ($($(2))) {
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
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    const g = $( f );
    if (g) {
      const h = $( 1 );
      const i = $( h );
      if (i) {
        const j = $( 1 );
        const k = $( j );
        if (k) {
          const l = $( 2 );
          $( l );
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
  }
  else {
    $( c );
  }
}
else {
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  let tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    let tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
    if (tmpIfTest) {
      let tmpCalleeParam$5 = $(1);
      tmpIfTest = $(tmpCalleeParam$5);
      if (tmpIfTest) {
        let tmpCalleeParam$7 = $(1);
        tmpIfTest = $(tmpCalleeParam$7);
        if (tmpIfTest) {
          let tmpCalleeParam$9 = $(2);
          $(tmpCalleeParam$9);
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
  } else {
    $(a);
  }
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
