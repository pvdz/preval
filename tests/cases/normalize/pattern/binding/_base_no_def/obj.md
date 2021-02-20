# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base no def > Obj
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
