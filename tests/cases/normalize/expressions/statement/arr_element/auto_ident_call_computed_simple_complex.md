# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b[$("$")](1) + b[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const tmpBinBothLhs /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
const tmpMCCP$1 /*:unknown*/ = $(`\$`);
const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
const tmpBinBothRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, undefined, 1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const tmpBinBothLhs = b[tmpMCCP](1);
const tmpMCCP$1 = $(`\$`);
tmpBinBothLhs + b[tmpMCCP$1](1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
const e = $( "$" );
const f = b[ e ];
const g = $dotCall( f, b, undefined, 1 );
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
const tmpMCCO = b;
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
const tmpBinBothLhs = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
const tmpMCCO$1 = b;
const tmpMCCP$1 = $(`\$`);
const tmpMCF$1 = tmpMCCO$1[tmpMCCP$1];
const tmpBinBothRhs = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
