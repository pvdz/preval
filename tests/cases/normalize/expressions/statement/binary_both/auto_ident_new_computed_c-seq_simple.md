# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident new computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, $(b))["$"](1) + new (1, 2, $(b))["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
const tmpBinBothLhs /*:object*/ /*truthy*/ = new tmpNewCallee(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
const tmpBinBothRhs /*:object*/ /*truthy*/ = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = $(b).$;
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = $(b).$;
tmpBinBothLhs + new tmpNewCallee$1(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
const e = $( a );
const f = e.$;
const g = new f( 1 );
d + g;
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
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
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
