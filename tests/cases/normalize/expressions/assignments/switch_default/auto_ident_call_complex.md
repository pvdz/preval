# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $($)(1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCallComplexCallee /*:unknown*/ = $($);
const a /*:unknown*/ = tmpCallComplexCallee(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCallComplexCallee = $($);
$(tmpCallComplexCallee(1));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = a( 1 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
