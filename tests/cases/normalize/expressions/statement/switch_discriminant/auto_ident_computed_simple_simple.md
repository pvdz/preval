# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch (b["c"]) {
  default:
    $(100);
}
$(a, b);
`````

## Settled


`````js filename=intro
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ a: 999, b: 1000 }, { c: 1 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = b[`c`];
  if (true) {
    $(100);
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = b.c;
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
const b = { c: 1 };
$( a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
