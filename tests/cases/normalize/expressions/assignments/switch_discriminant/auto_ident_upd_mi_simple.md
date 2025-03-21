# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ((a = --b)) {
  default:
    $(100);
}
$(a, b);
`````

## Settled


`````js filename=intro
$(100);
$(0, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(0, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = --b);
  if (true) {
    $(100);
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = b;
let tmpSwitchDisc = a;
$(100);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 0, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
