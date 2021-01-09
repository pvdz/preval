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

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = x;
      } else {
        x = x;
      }
    }
  }
  return x;
}
`````

## Output

`````js filename=intro

`````
