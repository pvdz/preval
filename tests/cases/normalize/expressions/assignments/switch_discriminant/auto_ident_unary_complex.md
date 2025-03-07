# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ((a = typeof $(x))) {
  default:
    $(100);
}
$(a, x);
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
let x = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = typeof $(x));
  if (true) {
    $(100);
  } else {
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpSwitchDisc = a;
$(100);
$(a, x);
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
