# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) && (a = ~$(100)));
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = ~tmpUnaryArg;
if (a) {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  const tmpNestedComplexRhs /*:number*/ = ~tmpUnaryArg$1;
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
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
if (a) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = ~tmpUnaryArg$1;
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
$((a = ~$(100)) && (a = ~$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = ~tmpUnaryArg$1;
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
const a = $( 100 );
const b = ~a;
if (b) {
  const c = $( 100 );
  const d = ~c;
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: -101
 - 4: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
