# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, $(b))["$"](1)) && (a = new (1, 2, $(b))["$"](1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
new tmpNewCallee(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = $(b).$;
new tmpNewCallee(1);
const tmpNewCallee$1 = $(b).$;
const tmpNestedComplexRhs = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
new c( 1 );
const d = $( a );
const e = d.$;
const f = new e( 1 );
$( f );
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
