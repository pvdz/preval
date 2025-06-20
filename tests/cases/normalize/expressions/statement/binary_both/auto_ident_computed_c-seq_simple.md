# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("c")] + (1, 2, $(b))[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const tmpBinBothLhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`c`);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpBinBothLhs = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`c`);
tmpBinBothLhs + tmpCompObj$1[tmpCalleeParam$1];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
const e = $( a );
const f = $( "c" );
const g = e[ f ];
d + g;
const h = {
  a: 999,
  b: 1000,
};
$( h, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpBinBothLhs = tmpCompObj[tmpCalleeParam];
const tmpCompObj$1 = $(b);
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
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { c: '1' }
 - 4: 'c'
 - 5: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
