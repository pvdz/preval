# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Statement > Arr element > Auto ident call prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b)).$(1) + (1, 2, $(b)).$(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpCallCompVal /*:unknown*/ = tmpCallObj.$;
const tmpBinBothLhs /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `\$`, 1);
const tmpCallObj$1 /*:unknown*/ = $(b);
const tmpCallCompVal$1 /*:unknown*/ = tmpCallObj$1.$;
const tmpBinBothRhs /*:unknown*/ = $dotCall(tmpCallCompVal$1, tmpCallObj$1, `\$`, 1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const tmpBinBothLhs = tmpCallObj.$(1);
const tmpCallObj$1 = $(b);
tmpBinBothLhs + tmpCallObj$1.$(1);
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
