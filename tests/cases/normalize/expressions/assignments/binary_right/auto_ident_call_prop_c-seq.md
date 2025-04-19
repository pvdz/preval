# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Binary right > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b)).$(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpMCOO = $({ $: $ });
const tmpClusterSSA_a = tmpMCOO.$(1);
$(tmpBinBothLhs + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { $: $ };
const c = $( b );
const d = c.$;
const e = $dotCall( d, c, "$", 1 );
const f = a + e;
$( f );
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 101
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
