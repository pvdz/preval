# Preval test case

# obj_obj.md

> Normalize > Pattern > Param > Base alias > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z: a}}}) { return a }
`````

## Normalized

`````js filename=intro
let i = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let a = objPatternNoDefault$1.z;
  return a;
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
