# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[++b];
$(a, b);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[2];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[2]);
$({ a: 999, b: 1000 }, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[++b];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
const tmpCompProp = b;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a[ 2 ];
const b = {
  a: 999,
  b: 1000,
};
$( b, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
