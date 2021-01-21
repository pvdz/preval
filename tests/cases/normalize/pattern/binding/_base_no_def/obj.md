# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x } = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
`````

## Output

`````js filename=intro
(1).x;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
