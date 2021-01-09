# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}} = d ) { return z }
`````

## Normalized

`````js filename=intro
function i($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = d;
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let z = objPatternNoDefault_1.z;
  return z;
}
`````

## Uniformed

`````js filename=intro
function x(x) {
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
  var x = x.x;
  var x = x.x;
  var x = x.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
