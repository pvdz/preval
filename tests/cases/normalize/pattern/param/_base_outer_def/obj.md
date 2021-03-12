# Preval test case

# obj.md

> Normalize > Pattern > Param > Base outer def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x } = b ) { return x }
`````

## Normalized

`````js filename=intro
let g = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = b;
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
  let x = $tdz$__pattern_after_default.x;
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
