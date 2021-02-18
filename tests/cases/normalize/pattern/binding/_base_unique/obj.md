# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
const { x } = 1;
{ let x = 1; }
`````

## Normalized

`````js filename=intro
let x$1 = 1;
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
let x$2 = 1;
`````

## Output

`````js filename=intro
(1).x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
