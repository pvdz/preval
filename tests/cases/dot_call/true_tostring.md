# Preval test case

# true_tostring.md

> Dot call > True tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, 'toString');
$(x);
`````


## Settled


`````js filename=intro
$(`true`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`true`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "true" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, `toString`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
