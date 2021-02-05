# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
a ? ({ x } = 1) : c;
`````

## Normalized

`````js filename=intro
if (a) {
  const tmpAssignObjPatternRhs = 1;
  x = tmpAssignObjPatternRhs.x;
  tmpAssignObjPatternRhs;
} else {
  c;
}
`````

## Output

`````js filename=intro
if (a) {
  x = (1).x;
} else {
}
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
