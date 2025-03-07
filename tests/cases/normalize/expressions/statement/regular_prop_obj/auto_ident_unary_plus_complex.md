# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(+$(100)).a;
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpCompObj /*:number*/ = +tmpUnaryArg;
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
(+tmpUnaryArg).a;
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(+$(100)).a;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(100);
const tmpCompObj = +tmpUnaryArg;
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = +a;
b.a;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
