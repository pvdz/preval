# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) + delete $(arg)["y"];
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpBinBothRhs /*:boolean*/ = delete tmpDeleteObj.y;
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
tmpBinBothLhs + delete tmpDeleteObj.y;
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { y: 1 };
const c = $( b );
const d = delete c.y;
a + d;
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
