# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $(1) ? (40, 50, 60) : $($(100))) || (a = $(1) ? (40, 50, 60) : $($(100)))
);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(60);
    $(60);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(100);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 60;
const tmpIfTest = $(1);
let tmpCalleeParam = 60;
if (!tmpIfTest) {
  a = $($(100));
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
  $(a);
} else {
  if ($(1)) {
    $(60);
    $(60);
  } else {
    const tmpClusterSSA_tmpNestedComplexRhs = $($(100));
    $(tmpClusterSSA_tmpNestedComplexRhs);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) || (a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = 60;
  } else {
    const tmpCalleeParam$3 = $(100);
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
let a = 60;
const b = $( 1 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  $( c );
  $( a );
}
else {
  const e = $( 1 );
  if (e) {
    $( 60 );
    $( 60 );
  }
  else {
    const f = $( 100 );
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
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
