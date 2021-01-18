# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > arr > rest > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = '');
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Result

Should call `$` with:
[[[]], null];

Normalized calls: Same

Final output calls: Same
