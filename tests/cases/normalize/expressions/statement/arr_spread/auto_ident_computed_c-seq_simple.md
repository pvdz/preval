# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
[...(1, 2, $(b))[$("c")]];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpArrElToSpread /*:unknown*/ = tmpCompObj[tmpCompProp];
[...tmpArrElToSpread];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpArrElToSpread = tmpCompObj[tmpCompProp];
[...tmpArrElToSpread];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
[ ...d ];
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
