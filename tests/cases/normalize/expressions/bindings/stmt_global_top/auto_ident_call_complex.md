# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident call complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = $($)(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const a /*:unknown*/ = tmpCallComplexCallee(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
$(tmpCallComplexCallee(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
