# Preval test case

# null.md

> Normalize > Templates > Static resolve > Var decl > Null
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${null}`;
$(x);
`````


## Settled


`````js filename=intro
$(`null`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`null`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "null" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
