# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident new computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) + new (1, 2, $(b))[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
const tmpBinBothRhs /*:object*/ /*truthy*/ = new tmpNewCallee(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCompObj = $({ $: $ });
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
tmpBinBothLhs + new tmpNewCallee(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { $: $ };
const c = $( b );
const d = $( "$" );
const e = c[ d ];
const f = new e( 1 );
a + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
const tmpBinBothRhs = new tmpNewCallee(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
