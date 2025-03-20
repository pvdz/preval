# Preval test case

# string.md

> Normalize > Templates > Static resolve > Var decl > String
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${"why"}`;
$(x);
`````


## Settled


`````js filename=intro
$(`why`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`why`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "why" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
