# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [[ x = a ]] = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const arrPatternSplat = [...1];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
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
