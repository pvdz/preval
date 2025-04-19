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
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpCallCompVal /*:unknown*/ = tmpCallCompObj[tmpCallCompProp];
const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallCompObj, undefined, 1);
const tmpCallCompObj$1 /*:unknown*/ = $(b);
const tmpCallCompProp$1 /*:unknown*/ = $(`\$`);
const tmpCallCompVal$1 /*:unknown*/ = tmpCallCompObj$1[tmpCallCompProp$1];
const tmpClusterSSA_a$1 /*:unknown*/ = $dotCall(tmpCallCompVal$1, tmpCallCompObj$1, undefined, 1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
const tmpCallCompObj$1 = $(b);
const tmpCallCompProp$1 = $(`\$`);
const tmpClusterSSA_a$1 = tmpCallCompObj$1[tmpCallCompProp$1](1);
$(tmpClusterSSA_a + tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
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
