# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("$")](1) + (1, 2, $(b))[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpBinBothLhs /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 /*:unknown*/ = $(b);
const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
const tmpBinBothRhs /*:unknown*/ = tmpCallCompObj$1[tmpCallCompProp$1](1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpBinBothLhs = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $(`\$`);
tmpBinBothLhs + tmpCallCompObj$1[tmpCallCompProp$1](1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 );
const e = $( a );
const f = $( "$" );
const g = e[ f ]( 1 );
d + g;
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: '$'
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
