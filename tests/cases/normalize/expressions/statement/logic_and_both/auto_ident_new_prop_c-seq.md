# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident new prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, $(b)).$(1) && new (1, 2, $(b)).$(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
new tmpNewCallee(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
new tmpNewCallee$1(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = $(b).$;
new tmpNewCallee(1);
const tmpNewCallee$1 = $(b).$;
new tmpNewCallee$1(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
new c( 1 );
const d = $( a );
const e = d.$;
new e( 1 );
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
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
