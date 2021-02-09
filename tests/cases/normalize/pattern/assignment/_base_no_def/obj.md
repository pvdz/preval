# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
({ x } = 1);
`````

## Normalized

`````js filename=intro
let x = 10;
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
`````

## Output

`````js filename=intro
let x = 10;
x = (1).x;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
