# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) || (a = ($($(1)) && $($(1))) || $($(2))));
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
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  } else {
  }
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$5);
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
  let tmpNestedComplexRhs = $($(1));
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(1));
  }
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
$($(100) || (a = ($($(1)) && $($(1))) || $($(2))));
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
  const tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  } else {
  }
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$5 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$5);
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
  let d = $( c );
  if (d) {
    const e = $( 1 );
    d = $( e );
  }
  if (d) {
    $( d );
    $( d );
  }
  else {
    const f = $( 2 );
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
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
