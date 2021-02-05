# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x]] = [[1, 2, 3], 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = [1, 2, 3];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
