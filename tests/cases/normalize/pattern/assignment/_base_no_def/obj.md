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
(1).x;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x;
`````

## Pre Normal


`````js filename=intro
let x = 10;
({ x: x } = 1);
`````

## Normalized


`````js filename=intro
let x = 10;
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
`````

## PST Settled
With rename=true

`````js filename=intro
1.x;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
