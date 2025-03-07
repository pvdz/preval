# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) || (a = typeof $(arg)));
$(a, arg);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpUnaryArg /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:string*/ = typeof tmpUnaryArg;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpUnaryArg = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$($(100) || (a = typeof $(arg)));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg = $(arg);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  $( b );
}
else {
  const c = $( 1 );
  const d = typeof c;
  a = d;
  $( d );
}
$( a, 1 );
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
