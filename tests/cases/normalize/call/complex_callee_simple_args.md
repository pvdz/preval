# Preval test case

# complex_callee_simple_args.md

> Normalize > Call > Complex callee simple args
>
> Calls should have simple idents

## Input

`````js filename=intro
$($)(1, 2);
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
tmpCallComplexCallee(1, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
tmpCallComplexCallee(1, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
a( 1, 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
