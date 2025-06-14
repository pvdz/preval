# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("c")] + (1, 2, b)[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpBinBothLhs /*:unknown*/ = b[tmpCalleeParam];
const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
const tmpBinBothRhs /*:unknown*/ = b[tmpCalleeParam$1];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParam = $(`c`);
const tmpBinBothLhs = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = b;
const tmpCalleeParam$1 = $(`c`);
const tmpBinBothRhs = tmpCompObj$1[tmpCalleeParam$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
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
