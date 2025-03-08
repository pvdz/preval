# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch (--b) {
  default:
    $(100);
}
$(a, b);
`````

## Settled


`````js filename=intro
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ a: 999, b: 1000 }, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = --b;
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
const tmpSwitchDisc = b;
$(100);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
