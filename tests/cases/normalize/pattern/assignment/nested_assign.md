# Preval test case

# nested_assign.md

> Normalize > Pattern > Assignment > Nested assign
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
y = { x } = { x: 1 };
$(y);
`````

## Settled


`````js filename=intro
x = 1;
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: 1 };
$(tmpNestedAssignObjPatternRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 1;
$({ x: 1 });
`````

## Pre Normal


`````js filename=intro
let y;
y = { x: x } = { x: 1 };
$(y);
`````

## Normalized


`````js filename=intro
let y = undefined;
const tmpNestedAssignObjPatternRhs = { x: 1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs;
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
x = 1;
const a = { x: 1 };
$( a );
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
