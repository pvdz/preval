# Preval test case

# default_no_no_no__str.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 'abc';
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$(x);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
