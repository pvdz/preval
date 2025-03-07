# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) || (a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
} else {
}
if (a) {
  $(a);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(1);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
  if (a) {
    a = $($(2));
  }
}
if (a) {
  $(a);
} else {
  let tmpNestedComplexRhs = $($(1));
  if (tmpNestedComplexRhs) {
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
$((a = $($(1)) && $($(1)) && $($(2))) || (a = $($(1)) && $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$7 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    } else {
    }
  } else {
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
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  $( b );
}
else {
  const e = $( 1 );
  let f = $( e );
  if (f) {
    const g = $( 1 );
    f = $( g );
    if (f) {
      const h = $( 2 );
      f = $( h );
    }
  }
  b = f;
  $( f );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
