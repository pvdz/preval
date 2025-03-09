# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$($(100) && (a = b = 2));
$(a, b, c);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(2);
  $(2, 2, 2);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(2);
  $(2, 2, 2);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1, 2);
}
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$($(100) && (a = b = 2));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = 2;
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c);
} else {
  $(tmpCalleeParam);
  $(a, b, c);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( 2 );
  $( 2, 2, 2 );
}
else {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b, 1, 2 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
