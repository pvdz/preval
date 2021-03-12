# Preval test case

# obj_arr.md

> Normalize > Pattern > Param > Base outer def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: [ y ]} = c ) { return y }
`````

## Normalized

`````js filename=intro
let i = function (tmpParamDefault) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = c;
  } else {
    $tdz$__pattern_after_default = tmpParamDefault;
  }
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return y;
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
