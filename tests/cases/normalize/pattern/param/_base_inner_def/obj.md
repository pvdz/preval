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
  var tmpTernaryTest;
  let objPatternBeforeDefault = tmpParamPattern.x;
  tmpTernaryTest = objPatternBeforeDefault === undefined;
  let x = tmpTernaryTest ? b : objPatternBeforeDefault;
  return x;
}
`````

## Output

`````js filename=intro

`````
