# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new (1, 2, $(b))[$("$")](1)];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
const tmpCalleeParam /*:object*/ /*truthy*/ = new tmpNewCallee(1);
$coerce(tmpCalleeParam, `string`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj$1 = $({ $: $ });
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCalleeParam$1];
$coerce(new tmpNewCallee(1), `string`);
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
$coerce( e, "string" );
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCalleeParam$1];
const tmpCalleeParam = new tmpNewCallee(1);
tmpCompObj[tmpCalleeParam];
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
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
