# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = ($($(1)) && $($(1))) || $($(2))) && (a = ($($(1)) && $($(1))) || $($(2)))
);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
let tmpCalleeParam /*:unknown*/ = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$5);
  tmpCalleeParam = a;
}
if (a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(1);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
  } else {
  }
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$11 /*:unknown*/ = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$11);
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
let tmpCalleeParam = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  a = $($(2));
  tmpCalleeParam = a;
}
if (a) {
  let tmpNestedComplexRhs = $($(1));
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(1));
  }
  if (!tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(2));
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) && (a = ($($(1)) && $($(1))) || $($(2))));
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
} else {
}
if (a) {
} else {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCalleeParam$7 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
  } else {
  }
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$11 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$11);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
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
}
let d = undefined;
if (b) {
  d = b;
}
else {
  const e = $( 2 );
  b = $( e );
  d = b;
}
if (b) {
  const f = $( 1 );
  let g = $( f );
  if (g) {
    const h = $( 1 );
    g = $( h );
  }
  if (g) {

  }
  else {
    const i = $( 2 );
    g = $( i );
  }
  b = g;
  $( g );
}
else {
  $( d );
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
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
