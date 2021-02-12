# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? b : ({ x } = 1);
`````

## Normalized

`````js filename=intro
if (a) {
  b;
} else {
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
}
`````

## Output

`````js filename=intro
if (a) {
  b;
} else {
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
