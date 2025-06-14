# Preval test case

# complex_callee_complex_args.md

> Normalize > Call > Complex callee complex args
>
> Calls should have simple idents

## Input

`````js filename=intro
$($)($(1), $(2));
`````


## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
tmpCallComplexCallee($(1), $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
a( b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = $($);
const tmpCallCallee = tmpCallComplexCallee;
let tmpCalleeParam = $(1);
let tmpCalleeParam$1 = $(2);
tmpCallComplexCallee(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
