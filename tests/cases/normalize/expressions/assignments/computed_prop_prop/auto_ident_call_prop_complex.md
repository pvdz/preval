# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident call prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b).$(1))];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
$coerce(tmpClusterSSA_a, `string`);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $({ $: $ });
const tmpClusterSSA_a = tmpMCOO.$(1);
$coerce(tmpClusterSSA_a, `string`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
$coerce( d, "string" );
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
