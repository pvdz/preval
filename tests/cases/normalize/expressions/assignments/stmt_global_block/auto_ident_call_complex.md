# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $($)(1);
  $(a);
}
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
a = tmpCallComplexCallee(1);
$(a);
`````


## Todos triggered


None


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
