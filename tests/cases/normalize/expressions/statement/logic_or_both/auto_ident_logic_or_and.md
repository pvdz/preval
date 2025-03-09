# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || ($($(1)) && $($(2))) || $($(0)) || ($($(1)) && $($(2)));
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
  let tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$3);
  } else {
  }
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(0);
    const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$5);
    if (tmpClusterSSA_tmpIfTest$1) {
      $(a);
    } else {
      const tmpCalleeParam$7 /*:unknown*/ = $(1);
      const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$7);
      if (tmpIfTest$1) {
        const tmpCalleeParam$9 /*:unknown*/ = $(2);
        $(tmpCalleeParam$9);
        $(a);
      } else {
        $(a);
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
  let tmpClusterSSA_tmpIfTest = $($(1));
  if (tmpClusterSSA_tmpIfTest) {
    tmpClusterSSA_tmpIfTest = $($(2));
  }
  if (tmpClusterSSA_tmpIfTest) {
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
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || ($($(1)) && $($(2))) || $($(0)) || ($($(1)) && $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    const tmpCalleeParam$3 = $(2);
    tmpIfTest = $(tmpCalleeParam$3);
  } else {
  }
  if (tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$5 = $(0);
    tmpIfTest = $(tmpCalleeParam$5);
    if (tmpIfTest) {
      $(a);
    } else {
      const tmpCalleeParam$7 = $(1);
      const tmpIfTest$1 = $(tmpCalleeParam$7);
      if (tmpIfTest$1) {
        const tmpCalleeParam$9 = $(2);
        $(tmpCalleeParam$9);
        $(a);
      } else {
        $(a);
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
  let e = $( d );
  if (e) {
    const f = $( 2 );
    e = $( f );
  }
  if (e) {
    $( c );
  }
  else {
    const g = $( 0 );
    const h = $( g );
    if (h) {
      $( c );
    }
    else {
      const i = $( 1 );
      const j = $( i );
      if (j) {
        const k = $( 2 );
        $( k );
        $( c );
      }
      else {
        $( c );
      }
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
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
