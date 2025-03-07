# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) && (a = typeof $(arg)));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
let a /*:unknown*/ = typeof tmpUnaryArg;
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpUnaryArg$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:string*/ = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
let a = typeof tmpUnaryArg;
const tmpCalleeParam = a;
if (a) {
  const tmpUnaryArg$1 = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) && (a = typeof $(arg)));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(arg);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = typeof a;
const c = b;
if (b) {
  const d = $( 1 );
  const e = typeof d;
  b = e;
  $( e );
}
else {
  $( c );
}
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'number'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
