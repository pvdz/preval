# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Var decl > Arr empty
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${[]}`;
$(x);
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
