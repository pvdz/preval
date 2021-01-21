# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [ x = a ] = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
{
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = a;
  } else {
    x = arrPatternBeforeDefault;
  }
}
`````

## Output

`````js filename=intro
const arrPatternSplat = [...1];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x;
let ifTestTmp = arrPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
