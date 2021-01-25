# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i([[ x = a ]]) { return x }
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat$1[0];
  let x;
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

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
