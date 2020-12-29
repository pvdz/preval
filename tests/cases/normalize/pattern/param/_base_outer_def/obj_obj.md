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
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? d : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  let arrPatternStep_1 = arrPatternStep.y;
  let z = arrPatternStep_1.z;
  return z;
}
`````

## Output

`````js filename=intro

`````
