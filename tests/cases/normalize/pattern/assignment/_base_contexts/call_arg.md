# Preval test case

# call_arg.md

> Normalize > Pattern > Assignment > Base contexts > Call arg
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 0;
$({ x } = 1);
`````

## Settled


`````js filename=intro
(1).x;
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x;
$(1);
`````

## Pre Normal


`````js filename=intro
let x = 0;
$(({ x: x } = 1));
`````

## Normalized


`````js filename=intro
let x = 0;
let tmpCalleeParam = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
1.x;
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
