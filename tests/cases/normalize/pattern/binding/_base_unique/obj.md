# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base unique > Obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
const { x } = 1;
{ let x = 1; }
`````

## Pre Normal


`````js filename=intro
{
  let x$1 = 1;
}
const { x: x } = 1;
{
  let x$3 = 1;
}
`````

## Normalized


`````js filename=intro
let x$1 = 1;
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
let x$3 = 1;
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
