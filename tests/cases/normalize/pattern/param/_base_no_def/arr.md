# Preval test case

# arr.md

> Normalize > Pattern > Param > Base no def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x ]) { return x }
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  return x;
}
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
