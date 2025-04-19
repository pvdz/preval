# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b[$("c")] + b[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpBinBothLhs /*:unknown*/ = b[tmpCalleeParam];
const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
const tmpBinBothRhs /*:unknown*/ = b[tmpCalleeParam$1];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`c`);
const b = { c: 1 };
const tmpBinBothLhs = b[tmpCalleeParam];
const tmpCalleeParam$1 = $(`c`);
tmpBinBothLhs + b[tmpCalleeParam$1];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = $( "c" );
const e = b[ d ];
c + e;
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
