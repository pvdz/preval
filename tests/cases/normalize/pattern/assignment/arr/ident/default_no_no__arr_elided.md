# Preval test case

# default_no_no__arr_elided.md

> Normalize > Pattern > Assignment > Arr > Ident > Default no no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = [, , , 1]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [, , , 1];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [, , , 1];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
