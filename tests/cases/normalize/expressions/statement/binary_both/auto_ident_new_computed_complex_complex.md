# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($(b)[$("$")])(1) + new ($(b)[$("$")])(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam];
const tmpBinBothLhs /*:object*/ = new tmpNewCallee(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
const tmpBinBothRhs /*:object*/ = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$1];
tmpBinBothLhs + new tmpNewCallee$1(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
const f = $( a );
const g = $( "$" );
const h = f[ g ];
const i = new h( 1 );
e + i;
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam];
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$1];
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


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
