# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) || (a = typeof $(x)));
$(a, x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
} else {
  const tmpUnaryArg /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:string*/ = typeof tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1);
} else {
  const tmpUnaryArg = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$($(100) || (a = typeof $(x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, x);
} else {
  const tmpUnaryArg = $(x);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b, 1 );
}
else {
  const c = $( 1 );
  const d = typeof c;
  $( d );
  $( d, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
