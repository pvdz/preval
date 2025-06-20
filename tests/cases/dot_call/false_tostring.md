# Preval test case

# false_tostring.md

> Dot call > False tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const bool = false;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, 'toString');
$(x);
`````


## Settled


`````js filename=intro
$(`false`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`false`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "false" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const bool = false;
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
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
