# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base unique > Obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
({ x } = 1);
{ let x = 1; }
`````

## Pre Normal


`````js filename=intro
{
  let x$3 = 1;
}
({ x: x } = 1);
{
  let x$1 = 1;
}
`````

## Normalized


`````js filename=intro
let x$3 = 1;
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
let x$1 = 1;
`````

## Output


`````js filename=intro
x = (1).x;
`````

## PST Output

With rename=true

`````js filename=intro
x = 1.x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
