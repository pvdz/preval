# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x: a } = 1)
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
a = tmpAssignObjPatternRhs.x;
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
a = tmpAssignObjPatternRhs.x;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
