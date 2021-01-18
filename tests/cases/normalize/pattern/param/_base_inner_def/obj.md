# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x = b } ) { return x }
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  {
    let x;
    {
      let ifTestTmp = objPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        x = b;
      } else {
        x = objPatternBeforeDefault;
      }
    }
  }
  return x;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
