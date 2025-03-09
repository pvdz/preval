# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) || (a = $($(0)) || 2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpCalleeParam /*:unknown*/ = 2;
if (a) {
  tmpCalleeParam = a;
} else {
  a = 2;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(0);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    $(2);
    $(2);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpCalleeParam = 2;
if (a) {
  tmpCalleeParam = a;
} else {
  a = 2;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpNestedComplexRhs = $($(0));
  if (tmpNestedComplexRhs) {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  } else {
    $(2);
    $(2);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) || (a = $($(0)) || 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$3 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
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
const a = $( 0 );
let b = $( a );
let c = 2;
if (b) {
  c = b;
}
else {
  b = 2;
}
if (b) {
  $( c );
  $( b );
}
else {
  const d = $( 0 );
  const e = $( d );
  if (e) {
    $( e );
    $( e );
  }
  else {
    $( 2 );
    $( 2 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
