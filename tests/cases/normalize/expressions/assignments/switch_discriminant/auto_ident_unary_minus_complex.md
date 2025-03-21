# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = -$(100))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
$(100);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
$(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = -$(100));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
$( 100 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
