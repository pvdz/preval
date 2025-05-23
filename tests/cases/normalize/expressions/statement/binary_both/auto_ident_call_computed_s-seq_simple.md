# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)["$"](1) + (1, 2, b)["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpBinBothLhs /*:unknown*/ = $dotCall($, b, `\$`, 1);
const tmpMCF$1 /*:unknown*/ = b.$;
const tmpBinBothRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, `\$`, 1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
$dotCall($, b, `\$`, 1) + b.$(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, "$", 1 );
const c = a.$;
const d = $dotCall( c, a, "$", 1 );
b + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCOO = b;
const tmpMCF = tmpMCOO.$;
const tmpBinBothLhs = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const tmpMCOO$1 = b;
const tmpMCF$1 = tmpMCOO$1.$;
const tmpBinBothRhs = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
