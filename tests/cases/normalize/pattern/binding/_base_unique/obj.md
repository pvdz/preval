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
{
  let x_1 = 1;
}
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
{
  let x_2 = 1;
}
`````

## Output

`````js filename=intro
(1).x;
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
