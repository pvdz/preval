# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(1)) && $($(1)) && $($(2))) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
    if (tmpClusterSSA_tmpNestedComplexRhs) {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$5);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
    } else {
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  } else {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNestedComplexRhs = $($(1));
  if (tmpNestedComplexRhs) {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(1));
    if (tmpClusterSSA_tmpNestedComplexRhs) {
      const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(2));
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
      $(tmpClusterSSA_tmpNestedComplexRhs$1);
    } else {
      $(tmpClusterSSA_tmpNestedComplexRhs);
      $(tmpClusterSSA_tmpNestedComplexRhs);
    }
  } else {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( b );
  if (c) {
    const d = $( 1 );
    const e = $( d );
    if (e) {
      const f = $( 2 );
      const g = $( f );
      $( g );
      $( g );
    }
    else {
      $( e );
      $( e );
    }
  }
  else {
    $( c );
    $( c );
  }
}
else {
  const h = $( 200 );
  $( h );
  const i = {
    a: 999,
    b: 1000,
  };
  $( i );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
