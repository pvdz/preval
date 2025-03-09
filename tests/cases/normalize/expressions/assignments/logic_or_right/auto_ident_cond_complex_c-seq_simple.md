# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
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
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpNestedComplexRhs = $(60);
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpNestedComplexRhs = $(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
  const c = $( 1 );
  if (c) {
    const d = $( 60 );
    $( d );
    $( d );
  }
  else {
    const e = $( 100 );
    const f = $( e );
    $( f );
    $( f );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
