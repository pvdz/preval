# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
typeof $(arg) || $(100);
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
typeof $(arg) || $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
const tmpIfTest = typeof tmpUnaryArg;
if (tmpIfTest) {
  $(a, arg);
} else {
  $(100);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
