# Preval test case

# default_no_no_no__arr_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = [undefined, 20, 30]);
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [undefined, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
