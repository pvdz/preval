# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg)[$("y")] + delete $(arg)[$("y")];
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $(`y`);
delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
delete b[ c ];
const d = $( a );
const e = $( "y" );
delete d[ e ];
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpBinBothLhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $(`y`);
const tmpBinBothRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: {}
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
