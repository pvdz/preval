# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new b[$("$")](1))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp$1];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
$coerce(tmpClusterSSA_a, `string`);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp$1];
const tmpClusterSSA_a = new tmpNewCallee(1);
$coerce(tmpClusterSSA_a, `string`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$coerce( d, "string" );
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
