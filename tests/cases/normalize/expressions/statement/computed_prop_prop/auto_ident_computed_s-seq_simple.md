# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(1, 2, b)[$("c")]];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCompProp$1 /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpCompProp /*:unknown*/ = b[tmpCompProp$1];
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp$1 = $(`c`);
const b = { c: 1 };
const tmpCompProp = b[tmpCompProp$1];
({}[tmpCompProp]);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = {};
d[ c ];
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
