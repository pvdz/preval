# Preval test case

# default_no_no__arr_undefined.md

> normalize > pattern >  > param > arr > obj > default_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{}] = [undefined, 20, 30];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [undefined, 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [undefined, 20, 30],
  arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````
