# Preval test case

# false.md

> Normalize > Templates > Static resolve > Assign > False
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${false}`;
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
