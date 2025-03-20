# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Assign > Undefined
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${undefined}`;
$(x);
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
