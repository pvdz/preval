# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) + delete ($(1), $(2), arg)[$("y")];
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpBinBothRhs /*:boolean*/ = delete arg[tmpDeleteCompProp];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
tmpBinBothLhs + delete arg[tmpDeleteCompProp];
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$( 2 );
const b = $( "y" );
const c = { y: 1 };
const d = delete c[ b ];
a + d;
const e = {
  a: 999,
  b: 1000,
};
$( e, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpBinBothRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
