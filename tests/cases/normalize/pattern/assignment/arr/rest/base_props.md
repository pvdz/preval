# Preval test case

# base_props.md

> Normalize > Pattern > Assignment > Arr > Rest > Base props
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

## Globals

BAD@! Found 2 implicit global bindings:

a, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
