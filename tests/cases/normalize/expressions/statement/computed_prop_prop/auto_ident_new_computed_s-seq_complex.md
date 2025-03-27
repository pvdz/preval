# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new (1, 2, b)[$("$")](1)];
$(a);
`````


## Settled


`````js filename=intro
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp$1];
const tmpCompProp /*:object*/ = new tmpNewCallee(1);
$coerce(tmpCompProp, `string`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp$1];
$coerce(new tmpNewCallee(1), `string`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$coerce( d, "string" );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
