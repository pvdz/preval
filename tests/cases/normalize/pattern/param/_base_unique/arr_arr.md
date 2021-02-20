# Preval test case

# arr_arr.md

> Normalize > Pattern > Param > Base unique > Arr arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function i([[ x ]]) {
  { let x = 2; }
  return x
}
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x$1 = arrPatternSplat$1[0];
  let x$2 = 2;
  return x$1;
}
let x = 1;
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
