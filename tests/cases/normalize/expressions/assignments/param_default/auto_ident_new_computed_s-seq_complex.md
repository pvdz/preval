# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = new (1, 2, b)[$("$")](1))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp];
const tmpNestedComplexRhs = new tmpNewCallee(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
$( undefined );
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: undefined
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
