# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("$")](1)) + (a = (1, 2, $(b))[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const a /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
const tmpMCCO$1 /*:unknown*/ = $(b);
const tmpMCCP$1 /*:unknown*/ = $(`\$`);
const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const a = tmpMCCO[tmpMCCP](1);
const tmpMCCO$1 = $(b);
const tmpMCCP$1 = $(`\$`);
const tmpClusterSSA_a = tmpMCCO$1[tmpMCCP$1](1);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
const f = $( a );
const g = $( "$" );
const h = f[ g ];
const i = $dotCall( h, f, undefined, 1 );
const j = e + i;
$( j );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
a = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
const tmpBinBothLhs = a;
const tmpMCCO$1 = $(b);
const tmpMCCP$1 = $(`\$`);
const tmpMCF$1 = tmpMCCO$1[tmpMCCP$1];
a = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
 - 7: 2
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
