# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x: a } = 1
`````

## Pre Normal

`````js filename=intro
const { x: a } = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const a = bindingPatternObjRoot.x;
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
