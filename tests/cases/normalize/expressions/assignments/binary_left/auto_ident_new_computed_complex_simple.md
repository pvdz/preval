# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident new computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($(b)["$"])(1)) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $({ $: $ }).$;
const tmpClusterSSA_a = new tmpNewCallee(1);
$(tmpClusterSSA_a + $(100));
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
const e = $( 100 );
const f = d + e;
$( f );
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: '[object Object]100'
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
