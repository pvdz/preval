# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    $(60);
    $(60);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  if ($(1)) {
    $(60);
    $(60);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(100));
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpNestedComplexRhs = 60;
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs = $(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 1 );
  if (b) {
    $( 60 );
    $( 60 );
  }
  else {
    const c = $( 100 );
    const d = $( c );
    $( d );
    $( d );
  }
}
else {
  $( a );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
