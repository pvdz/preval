# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x } = b ) { return x }
`````

## Normalized

`````js filename=intro
function g($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = b;
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let x = $tdz$__pattern_after_default.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
