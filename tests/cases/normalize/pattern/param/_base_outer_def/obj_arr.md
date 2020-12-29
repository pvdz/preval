# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

#TODO

## Input

`````js filename=intro
function i({x: [ y ]} = c ) { return y }
`````

## Normalized

`````js filename=intro
function i($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? c : $tdz$__pattern;
  let arrPatternStep = $tdz$__pattern_after_default.x;
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  return y;
}
`````

## Output

`````js filename=intro

`````
