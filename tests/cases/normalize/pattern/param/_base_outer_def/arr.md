# Preval test case

# arr.md

> Normalize > Pattern > Param > Base outer def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x ] = b) { return x }
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = b;
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat[0];
  return x;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
