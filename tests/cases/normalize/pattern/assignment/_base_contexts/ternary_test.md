# Preval test case

# ternary_test.md

> Normalize > Pattern > Assignment > Base contexts > Ternary test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 1, b = 2, c = 3;
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
let x = 1,
  b = 2,
  c = 3;
({ x: x } = 1) ? b : c;
`````

## Normalized


`````js filename=intro
let x = 1;
let b = 2;
let c = 3;
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
