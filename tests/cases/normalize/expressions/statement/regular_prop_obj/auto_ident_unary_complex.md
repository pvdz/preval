# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(typeof $(x)).a;
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpCompObj /*:string*/ = typeof tmpUnaryArg;
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
(typeof tmpUnaryArg).a;
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
b.a;
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
