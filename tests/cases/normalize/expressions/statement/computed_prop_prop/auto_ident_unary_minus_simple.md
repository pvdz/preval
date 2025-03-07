# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident unary minus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[-arg];
$(a, arg);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[-1];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[-1]);
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[-arg];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompProp = -arg;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a[ -1 ];
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
