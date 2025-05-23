# Preval test case

# undefined.md

> Typeof > Undefined
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof undefined);
`````


## Settled


`````js filename=intro
$(`undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "undefined" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `undefined`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
