# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (1, 2, $(b))[$("c")];
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
tmpCompObj[tmpCalleeParam];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
tmpCompObj[tmpCalleeParam];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
b[ c ];
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
tmpCompObj[tmpCalleeParam];
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
