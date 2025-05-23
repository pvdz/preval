# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) + b[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpBinBothRhs /*:unknown*/ = b[tmpCalleeParam];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $(`c`);
const b = { c: 1 };
tmpBinBothLhs + b[tmpCalleeParam];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( "c" );
const c = { c: 1 };
const d = c[ b ];
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
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCompObj = b;
const tmpCalleeParam = $(`c`);
const tmpBinBothRhs = tmpCompObj[tmpCalleeParam];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
