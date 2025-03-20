# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(60);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 });
} else {
  if ($(1)) {
    const tmpClusterSSA_tmpNestedComplexRhs = $(60);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(100));
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c );
}
else {
  const d = $( 1 );
  if (d) {
    const e = $( 60 );
    $( e );
    $( e );
  }
  else {
    const f = $( 100 );
    const g = $( f );
    $( g );
    $( g );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 60
 - 4: 60
 - 5: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
