# Preval test case

# default_no_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x]] = ['abc', 4, 5];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[...x]] = ['abc', 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc', 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = ['a', 'b', 'c'];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
