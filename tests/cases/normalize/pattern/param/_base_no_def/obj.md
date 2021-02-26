# Preval test case

# obj.md

> Normalize > Pattern > Param > Base no def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x }) { return x }
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let x = tmpParamPattern.x;
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
