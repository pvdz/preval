# Preval test case

# obj.md

> Normalize > Pattern > Param > Base alias > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x: y }) { return y }
`````

## Pre Normal

`````js filename=intro
let g = function (tmpParamPattern) {
  let { x: y } = tmpParamPattern;
  return y;
};
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let y = bindingPatternObjRoot.x;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
