# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function h([{ x }] = c ) { return x}
`````

## Normalized

`````js filename=intro
function h($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = c;
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
