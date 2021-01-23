# Preval test case

# base.md

> normalize > pattern > param > arr > arr > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[[...x]]]) {
  return x;
}
$(f([[[1, 2, 3], 20, 30], 40, 50], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let x = arrPatternSplat$2.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 20, 30];
tmpArg$1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let x = arrPatternSplat$2.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpElement$1;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 20, 30];
tmpArg$1 = [tmpElement, 40, 50];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [1,2,3]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
