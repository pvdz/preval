# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(b = 2)];
$(a, b, c);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[2];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[2]);
$({ a: 999, b: 1000 }, 2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(b = 2)];
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
b = 2;
let tmpCompProp = b;
tmpCompObj[tmpCompProp];
$(a, b, c);
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
$( b, 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
