# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Ident > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Settled


`````js filename=intro
x = 1;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$(x);
`````

## Pre Normal


`````js filename=intro
({ x: x } = { x: 1, b: 2, c: 3 });
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: 1, b: 2, c: 3 };
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
x = 1;
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
