# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident new computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
new (1, 2, $(b))[$("$")](1)["a"];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj$1[tmpCompProp];
const tmpCompObj /*:object*/ = new tmpNewCallee(1);
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj$1 = $({ $: $ });
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
new tmpNewCallee(1).a;
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
e.a;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


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
