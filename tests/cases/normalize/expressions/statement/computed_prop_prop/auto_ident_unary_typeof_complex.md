# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[typeof $(arg)];
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const obj /*:object*/ = {};
const tmpCompProp /*:string*/ = typeof tmpUnaryArg;
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const obj = {};
const tmpCompProp = typeof tmpUnaryArg;
obj[tmpCompProp];
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {};
const c = typeof a;
b[ c ];
const d = {
  a: 999,
  b: 1000,
};
$( d, 1 );
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
