# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) &&
    (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
let tmpCalleeParam /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpCalleeParam = a;
}
if (a) {
  const tmpIfTest$1 /*:unknown*/ = $(30);
  if (tmpIfTest$1) {
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(60);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpNestedComplexRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
let tmpCalleeParam = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCalleeParam = a;
} else {
  a = $($(100));
  tmpCalleeParam = a;
}
if (a) {
  if ($(30)) {
    const tmpClusterSSA_tmpNestedComplexRhs = $(60);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs$1 = $($(100));
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
    $(tmpClusterSSA_tmpNestedComplexRhs$1);
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
let c = undefined;
if (b) {
  a = $( 60 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  const e = $( 30 );
  if (e) {
    const f = $( 60 );
    $( f );
    $( f );
  }
  else {
    const g = $( 100 );
    const h = $( g );
    $( h );
    $( h );
  }
}
else {
  $( c );
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 30
 - 4: 60
 - 5: 60
 - 6: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
