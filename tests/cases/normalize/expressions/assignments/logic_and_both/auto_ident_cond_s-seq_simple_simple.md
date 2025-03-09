# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident cond s-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, 30) ? $(2) : $($(100))) && (a = (10, 20, 30) ? $(2) : $($(100)))
);
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
if (a) {
  const tmpNestedComplexRhs /*:unknown*/ = $(2);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
if (a) {
  const tmpNestedComplexRhs = $(2);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, 30) ? $(2) : $($(100))) && (a = (10, 20, 30) ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = $(2);
  } else {
    const tmpCalleeParam$3 = $(100);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
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
const a = $( 2 );
if (a) {
  const b = $( 2 );
  $( b );
  $( b );
}
else {
  $( a );
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
