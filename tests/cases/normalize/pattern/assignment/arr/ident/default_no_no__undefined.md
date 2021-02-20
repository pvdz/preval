# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Arr > Ident > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = undefined;
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
const arrPatternSplat = [...undefined];
x = arrPatternSplat[0];
$('bad');
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
