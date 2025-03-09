# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs /*:unknown*/ = $(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$($(100) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(x);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, x);
} else {
  $(tmpCalleeParam);
  $(a, x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( 1 );
  $( 2 );
  const b = $( 1 );
  $( b );
  $( b, 1 );
}
else {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
