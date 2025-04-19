# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b).$(1)) + (a = $(b).$(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const tmpMCOO$1 /*:unknown*/ = $(b);
const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.$;
const tmpClusterSSA_a$1 /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `\$`, 1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCOO = $(b);
const tmpClusterSSA_a = tmpMCOO.$(1);
const tmpMCOO$1 = $(b);
const tmpClusterSSA_a$1 = tmpMCOO$1.$(1);
$(tmpClusterSSA_a + tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
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
const h = d + g;
$( h );
$( g );
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
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
