# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(b).c) {
  default:
    $(100);
}
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
tmpCompObj.c;
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
$(b).c;
$(100);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(b).c;
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
const tmpCompObj = $(b);
const tmpSwitchDisc = tmpCompObj.c;
$(100);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
b.c;
$( 100 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
