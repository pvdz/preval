# Preval test case

# ternary_test2.md

> Normalize > Pattern > Assignment > Base contexts > Ternary test2
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x, b, c
({ x } = 1) ? b : c;
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
let x, b, c;
({ x: x } = 1) ? b : c;
`````

## Normalized


`````js filename=intro
let x = undefined;
let b = undefined;
let c = undefined;
let tmpIfTest = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpIfTest = tmpNestedAssignObjPatternRhs;
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
