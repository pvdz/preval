# Preval test case

# default_no_no__arr_arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__arr_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x]] = [[, , , 1], 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = [, , , 1];
const arrAssignPatternRhs = [tmpArrElement, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
