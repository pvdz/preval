# Preval test case

# arr.md

> Normalize > Pattern > Param > Base inner def > Arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f([ x = a ]) { return x }
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = a;
  } else {
    x = arrPatternBeforeDefault;
  }
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
