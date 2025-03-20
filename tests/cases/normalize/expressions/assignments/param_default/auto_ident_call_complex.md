# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)(1))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpNestedComplexRhs /*:unknown*/ = tmpCallComplexCallee(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpNestedComplexRhs = tmpCallComplexCallee(1);
$(undefined);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
$( undefined );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
