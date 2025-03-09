# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $($(0)) || $($(2))));
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
  const tmpCalleeParam$1 /*:unknown*/ = $(0);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
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
  const tmpNestedComplexRhs = $($(0));
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(2));
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = $($(0)) || $($(2))));
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
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
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
  const c = $( 0 );
  const d = $( c );
  if (d) {
    $( d );
    $( d );
  }
  else {
    const e = $( 2 );
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
