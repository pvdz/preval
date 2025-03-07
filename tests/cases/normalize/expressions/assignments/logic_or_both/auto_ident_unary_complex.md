# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) || (a = typeof $(x)));
$(a, x);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
let a /*:unknown*/ = typeof tmpUnaryArg;
if (a) {
  $(a);
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:string*/ = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
let a = typeof tmpUnaryArg;
if (a) {
  $(a);
} else {
  const tmpUnaryArg$1 = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(x)) || (a = typeof $(x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpUnaryArg$1 = $(x);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = typeof a;
if (b) {
  $( b );
}
else {
  const c = $( 1 );
  const d = typeof c;
  b = d;
  $( d );
}
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
