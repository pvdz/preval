# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) || (a = $($(0)) || ($($(1)) && $($(2))))
);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$9);
    if (tmpClusterSSA_tmpNestedComplexRhs) {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$11);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
    } else {
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (a) {
    a = $($(2));
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = $($(0));
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(1));
    if (tmpClusterSSA_tmpNestedComplexRhs) {
      const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(2));
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
    } else {
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  $( b );
  $( b );
}
else {
  const e = $( 0 );
  const f = $( e );
  if (f) {
    $( f );
    $( f );
  }
  else {
    const g = $( 1 );
    const h = $( g );
    if (h) {
      const i = $( 2 );
      const j = $( i );
      $( j );
      $( j );
    }
    else {
      $( h );
      $( h );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  let tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    let tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    let tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      let tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    } else {
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
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
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
