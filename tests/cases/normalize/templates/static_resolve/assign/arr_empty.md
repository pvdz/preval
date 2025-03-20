# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Assign > Arr empty
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${[]}`;
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
