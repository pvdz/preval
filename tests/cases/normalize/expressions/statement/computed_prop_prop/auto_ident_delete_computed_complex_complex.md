# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[delete $(arg)[$("y")]];
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpCompProp /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpCompProp = delete tmpDeleteCompObj[tmpDeleteCompProp];
({}[tmpCompProp]);
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
const e = {};
e[ d ];
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
