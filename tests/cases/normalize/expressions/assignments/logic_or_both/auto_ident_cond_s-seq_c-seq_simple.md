# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))) ||
    (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs /*:unknown*/ = $(60);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = $(60);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))) || (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
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
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = $(60);
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
const a = $( 60 );
if (a) {
  $( a );
  $( a );
}
else {
  const b = $( 60 );
  $( b );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
