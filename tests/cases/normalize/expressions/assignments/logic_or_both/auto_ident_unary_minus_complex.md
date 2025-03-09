# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) || (a = -$(100)));
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
if (a) {
  $(a);
  $(a);
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  const tmpNestedComplexRhs /*:number*/ = -tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
if (a) {
  $(a);
  $(a);
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) || (a = -$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = -tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
if (b) {
  $( b );
  $( b );
}
else {
  const c = $( 100 );
  const d = -c;
  $( d );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
