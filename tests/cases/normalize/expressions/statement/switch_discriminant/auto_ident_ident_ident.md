# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ((b = 2)) {
  default:
    $(100);
}
$(a, b, c);
`````

## Settled


`````js filename=intro
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ a: 999, b: 1000 }, 2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (b = 2);
  if (true) {
    $(100);
  } else {
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpSwitchDisc = b;
$(100);
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
