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

## Output


`````js filename=intro
(1).x;
`````

## PST Output

With rename=true

`````js filename=intro
1.x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
