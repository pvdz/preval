# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) && (a = $($(0)) || ($($(1)) && $($(2))))
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
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    } else {
    }
  }
  const tmpClusterSSA_a /*:unknown*/ = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(tmpClusterSSA_a);
} else {
  $(tmpCalleeParam);
  $(a);
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
const tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = $($(0));
  if (!tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(1));
    if (tmpNestedComplexRhs) {
      tmpNestedComplexRhs = $($(2));
    }
  }
  const tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(tmpClusterSSA_a);
} else {
  $(tmpCalleeParam);
  $(a);
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
const e = b;
if (b) {
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    const h = $( 1 );
    g = $( h );
    if (g) {
      const i = $( 2 );
      g = $( i );
    }
  }
  const j = g;
  $( g );
  $( j );
}
else {
  $( e );
  $( b );
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
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
