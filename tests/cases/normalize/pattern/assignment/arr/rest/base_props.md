# Preval test case

# base.md

> normalize > pattern >  > param > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([a, ...x] = [1, 2, 3]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
x = arrPatternSplat.slice(1);
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
x = arrPatternSplat.slice(1);
$(x);
`````

## Result

Should call `$` with:
 - 1: [2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
