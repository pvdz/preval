# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ((a = typeof $(arg))) {
  default:
    $(100);
}
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
$(100);
const a /*:string*/ = typeof tmpUnaryArg;
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(100);
$(typeof tmpUnaryArg, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = typeof $(arg));
  if (true) {
    $(100);
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpSwitchDisc = a;
$(100);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( 100 );
const b = typeof a;
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
