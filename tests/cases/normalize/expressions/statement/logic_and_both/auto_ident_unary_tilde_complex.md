# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
~$(100) && ~$(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpIfTest /*:number*/ = ~tmpUnaryArg;
if (tmpIfTest) {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  +tmpUnaryArg$1;
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
if (~tmpUnaryArg) {
  const tmpUnaryArg$1 = $(100);
  +tmpUnaryArg$1;
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
~$(100) && ~$(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpIfTest = ~tmpUnaryArg;
if (tmpIfTest) {
  const tmpUnaryArg$1 = $(100);
  +tmpUnaryArg$1;
} else {
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
if (b) {
  const c = $( 100 );
  +c;
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
