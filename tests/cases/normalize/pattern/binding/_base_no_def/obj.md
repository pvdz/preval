# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base no def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x } = 1;
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
const { x: x } = 1;
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
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
