# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base no def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
({ x } = 1);
`````


## Settled


`````js filename=intro
$Number_prototype.x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.x;
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.x;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
