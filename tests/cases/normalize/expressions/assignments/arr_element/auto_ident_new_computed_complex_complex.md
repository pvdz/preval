# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($(b)[$("$")])(1)) + (a = new ($(b)[$("$")])(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
const a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
const tmpClusterSSA_a /*:object*/ /*truthy*/ = new tmpNewCallee$1(1);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$1];
const a = new tmpNewCallee(1);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$3];
const tmpClusterSSA_a = new tmpNewCallee$1(1);
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
const e = new d( 1 );
const f = $( a );
const g = $( "$" );
const h = f[ g ];
const i = new h( 1 );
const j = e + i;
$( j );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$1];
a = new tmpNewCallee(1);
const tmpBinBothLhs = a;
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCalleeParam$3];
a = new tmpNewCallee$1(1);
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
 - 7: '[object Object][object Object]'
 - 8: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
