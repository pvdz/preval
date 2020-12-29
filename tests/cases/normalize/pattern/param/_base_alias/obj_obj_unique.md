# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let a = 1;
function i({x: {y: {z: a}}}) {
  {
    let a = 2;
  }
  return a;
}
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternStep_1 = arrPatternStep.y;
  let a_1 = arrPatternStep_1.z;
  {
    let a_2 = 2;
  }
  return a_1;
}
let a = 1;
`````

## Output

`````js filename=intro

`````
