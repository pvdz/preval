# Preval test case

# obj.md

> Normalize > Pattern > Param > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x: y }) { return y }
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let y = $tdz$__pattern_after_default.x;
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
