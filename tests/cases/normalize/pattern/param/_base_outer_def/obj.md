# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO

## Input

`````js filename=intro
function g({ x } = b ) { return x }
`````

## Normalized

`````js filename=intro
function g($tdz$__pattern) {
  var tmpTernaryTest;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? b : $tdz$__pattern;
  let x = $tdz$__pattern_after_default.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
