# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident call computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b))["$"](1) + (1, 2, $(b))["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpBinBothLhs /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const tmpMCOO$1 /*:unknown*/ = $(b);
const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
const tmpBinBothRhs /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
const tmpBinBothLhs = tmpMCOO.$(1);
const tmpMCOO$1 = $(b);
tmpBinBothLhs + tmpMCOO$1.$(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
const e = $( a );
const f = e.$;
const g = $dotCall( f, e, "$", 1 );
d + g;
const h = {
  a: 999,
  b: 1000,
};
$( h );
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
