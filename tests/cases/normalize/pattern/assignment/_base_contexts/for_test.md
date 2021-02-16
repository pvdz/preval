# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
for ({ x } = 1;false;) y;
`````

## Normalized

`````js filename=intro
{
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
}
`````

## Output

`````js filename=intro
x = (1).x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
