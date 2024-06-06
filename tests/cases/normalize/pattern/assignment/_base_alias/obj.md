# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x: a } = 1)
`````

## Pre Normal


`````js filename=intro
({ x: a } = 1);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = 1;
a = tmpAssignObjPatternRhs.x;
`````

## Output


`````js filename=intro
a = (1).x;
`````

## PST Output

With rename=true

`````js filename=intro
a = 1.x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
