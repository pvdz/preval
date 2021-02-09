# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x = b } = 1);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
