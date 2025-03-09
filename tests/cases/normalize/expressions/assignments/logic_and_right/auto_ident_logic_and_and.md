# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
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
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$5);
    } else {
    }
  } else {
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
  $( a );
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
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
