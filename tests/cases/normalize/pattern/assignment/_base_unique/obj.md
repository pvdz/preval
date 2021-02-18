# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
({ x } = 1);
{ let x = 1; }
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpAssignObjPatternRhs = 1;
x$1 = tmpAssignObjPatternRhs.x;
let x$2 = 1;
`````

## Output

`````js filename=intro
x$1 = (1).x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
