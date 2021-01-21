# Preval test case

# default_no_no__arr_null.md

> normalize > pattern >  > param > arr > ident > default_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = [null]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [null];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [null];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
