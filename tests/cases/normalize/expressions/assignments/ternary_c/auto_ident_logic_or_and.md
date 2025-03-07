# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(0);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$5 /*:unknown*/ = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$5);
    } else {
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(0)) {
  $($(100));
} else {
  let tmpNestedComplexRhs = $($(0));
  if (!tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(1));
    if (tmpNestedComplexRhs) {
      tmpNestedComplexRhs = $($(2));
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$5 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$5);
    } else {
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = $( 0 );
  let e = $( d );
  if (e) {

  }
  else {
    const f = $( 1 );
    e = $( f );
    if (e) {
      const g = $( 2 );
      e = $( g );
    }
  }
  a = e;
  $( e );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
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
