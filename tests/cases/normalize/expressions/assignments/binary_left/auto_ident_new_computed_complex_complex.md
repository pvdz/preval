# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($(b)[$("$")])(1)) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
const a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompObj = $({ $: $ });
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCalleeParam$1];
const a = new tmpNewCallee(1);
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
const f = $( 100 );
const g = e + f;
$( g );
$( e );
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
const tmpBinBothRhs = $(100);
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
 - 4: 100
 - 5: '[object Object]100'
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
