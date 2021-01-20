# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = b;
  } else {
    x = objPatternBeforeDefault;
  }
}
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (1).x;
let x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
