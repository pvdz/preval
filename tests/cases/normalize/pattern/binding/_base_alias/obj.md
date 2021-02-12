# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x: a } = 1
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const a = bindingPatternObjRoot.x;
`````

## Output

`````js filename=intro
const a = (1).x;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
