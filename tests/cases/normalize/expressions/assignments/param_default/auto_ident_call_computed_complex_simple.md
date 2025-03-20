# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident call computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)["$"](1))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpNestedComplexRhs /*:unknown*/ = tmpCallObj.$(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = $({ $: $ }).$(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( undefined );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
